import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import i18next from "i18next";
import { AuthContext } from "../context/AuthContext";

export default function useApiService() {
  const navigate = useNavigate();
  const { signIn, signOut } = useContext(AuthContext);

  // Variavel para informar se está acontecendo uma requisição de refresh token
  let isRefreshing = false;
  // Variavel para armazenar a fila de requisições que falharam por token expirado
  let failedRequestQueue = [];

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  api.interceptors.request.use(
    (request) => {
      const token = Cookies.get("accessToken");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }

      const language = i18next.language.startsWith("pt") ? "pt-BR" : "en-US";
      request.headers["Accept-Language"] = language;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (!Cookies.get("accessToken")) {
          const refreshRequest = Cookies.get("refreshRequest");
          if (refreshRequest) {
            const originalConfig = error.config;
            if (!isRefreshing) {
              isRefreshing = true;
              api
                .post("/User/SignIn/Refresh", JSON.parse(refreshRequest))
                .then(({ data }) => {
                  signIn(
                    data.user,
                    data.accessToken,
                    data.expiresInSeconds,
                    data.refreshToken,
                    data.refreshTokenExpiresInSeconds
                  );

                  api.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;

                  // Faz todas as requisições que estavam na fila e falharam
                  failedRequestQueue.forEach((request) =>
                    request.onSuccess(data.accessToken)
                  );
                  // Limpa a fila de requisições que falharam
                  failedRequestQueue = [];
                })
                .catch((err) => {
                  // Retorna os erros que estão salvos na fila de requisições que falharam
                  failedRequestQueue.forEach((request) =>
                    request.onFailure(err)
                  );
                  // Limpa a fila de requisições que falharam
                  failedRequestQueue = [];

                  // Caso der erro desloga o usuário
                  signOut();
                  navigate("/");
                })
                .finally(() => {
                  // Indica que a requisição de refreshToken acabou
                  isRefreshing = false;
                });
            }

            // Usando a Promise no lugar do async await, para que a requisição seja feita após o refresh token
            return new Promise((resolve, reject) => {
              // Adiciona a requisição na fila de requisições que falharam com as informações necessárias para refazer a requisição novamente
              failedRequestQueue.push({
                // Se a requisição der sucesso, chama o onSuccess
                onSuccess: (token) => {
                  // Adiciona o novo token gerado no refresh token no header de autorização
                  originalConfig.headers["Authorization"] = `Bearer ${token}`;

                  // Faz a requisição novamente passando as informações originais da requisição que falhou
                  resolve(api(originalConfig));
                },
                // Se a requisição der erro, chama o onFailure
                onFailure: (err) => {
                  // Se não for possivel refazer a requisição, retorna o erro
                  reject(err);
                },
              });
            });
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return {
    api
  };
}
