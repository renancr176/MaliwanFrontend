import api from "./api";

export async function signInRequest({userName, password}) {
    const {data} = await api.post("/auth/signin", {userName, password});
    return data;
}

export async function requestPasswordResetRequest(userName) {
    const {data} = await api.post("/Auth/PasswordReset", {userName});
    return data;
}

export async function resetPasswordRequest({Token, NewPassword}) {
    const {data} = await api.post("/Auth/ResetPassword", {Token, NewPassword});
    return data;
}