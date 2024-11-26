import axios from "axios";
import Cookies from "js-cookie";
import i18next from "i18next";

const url = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (request) => {
    const token = Cookies.get("accessToken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    } else {
      const refreshRequest = Cookies.get("refreshRequest");
      if (refreshRequest) {
        await Promise.all([
          signInRefreshRequest(JSON.parse(refreshRequest)).then(({ data }) => {
            const expiresInDays = data.expiresInSeconds / 24 / 60 / 60;
            Cookies.set("accessToken", data.accessToken, {
              expires: expiresInDays,
            });
            const refreshTokenExpiresInDays =
              data.refreshTokenExpiresInSeconds / 24 / 60 / 60;
            Cookies.set(
              "refreshRequest",
              JSON.stringify({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
              }),
              { expires: refreshTokenExpiresInDays }
            );
          }),
        ]);

        const token = Cookies.get("token");
        if (token) {
          request.headers.Authorization = `Bearer ${token}`;
        }
      }
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
      Cookies.remove("token");
    }
    return Promise.reject(error);
  }
);

export default api;

export async function signInRefreshRequest(request) {
  const obj = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const { data } = await obj.post("/User/SignIn/Refresh", request);
  return data;
}
