import api from "./apiService";

export async function signInRequest(request) {
	const { data } = await api.post("/User/SignIn", request);
	return data;
}

export async function signInRefreshRequest(request) {
	const { data } = await api.post("/User/SignIn/Refresh", request);
	return data;
}

export async function signUpRequest(request) {
	const { data } = await api.post("/User/SignUp", request);
	return data;
}

export async function confirmEmailRequest(request) {
	const { data } = await api.post("/User/ConfirmEmail", request);
	return data;
}

export async function passwordResetRequest(request) {
	const { data } = await api.post("/User/PasswordReset", request);
	return data;
}

export async function resetPasswordRequest(request) {
	const { data } = await api.post("/User/ResetPassword", request);
	return data;
}

export async function includeRoleRequest(request) {
	const { data } = await api.post("/User/IncludeRole", request);
	return data;
}