import useApiService from "./apiService";

export default function useUserService() {
  const { api } = useApiService();

  async function signInRequest(request) {
    const { data } = await api.post("/User/SignIn", request);
    return data;
  }

  async function signInRefreshRequest(request) {
    const { data } = await api.post("/User/SignIn/Refresh", request);
    return data;
  }

  async function signUpRequest(request) {
    const { data } = await api.post("/User/SignUp", request);
    return data;
  }

  async function confirmEmailRequest(request) {
    const { data } = await api.post("/User/ConfirmEmail", request);
    return data;
  }

  async function passwordResetRequest(request) {
    const { data } = await api.post("/User/PasswordReset", request);
    return data;
  }

  async function resetPasswordRequest(request) {
    const { data } = await api.post("/User/ResetPassword", request);
    return data;
  }

  async function includeRoleRequest(request) {
    const { data } = await api.post("/User/IncludeRole", request);
    return data;
  }

  return {
    signInRequest,
    signInRefreshRequest,
    signUpRequest,
    confirmEmailRequest,
    passwordResetRequest,
    resetPasswordRequest,
    includeRoleRequest,
  };
}
