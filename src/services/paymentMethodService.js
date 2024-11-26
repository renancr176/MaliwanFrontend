import api from "./apiService";

//#region Gets
export async function getPaymentMethodById(id) {
    const {data} = await api.get(`/PaymentMethod/${id}`);
    return data;
}

export async function getAllPaymentMethods() {
    const {data} = await api.get('/PaymentMethod');
    return data;
}

export async function searchPaymentMethods(searchParams) {
    const {data} = await api.get('/PaymentMethod/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createPaymentMethod(request) {
	const { data } = await api.post("/PaymentMethod", request);
	return data;
}

export async function updatePaymentMethod(request) {
	const { data } = await api.put("/PaymentMethod", request);
	return data;
}

export async function deletePaymentMethod(id) {
	const { data } = await api.delete(`/PaymentMethod/${id}`);
	return data;
}