import api from "./apiService";

//#region Gets
export async function getOrderPaymentById(id) {
    const {data} = await api.get(`/OrderPayment/${id}`);
    return data;
}

export async function getOrderPaymentByIdOrder(idOrder) {
    const {data} = await api.get(`/OrderPayment/Order/${idOrder}`);
    return data;
}

export async function searchOrderPayments(searchParams) {
    const {data} = await api.get('/OrderPayment/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createOrderPayment(request) {
	const { data } = await api.post("/OrderPayment", request);
	return data;
}

export async function updateOrderPayment(request) {
	const { data } = await api.put("/OrderPayment", request);
	return data;
}

export async function deleteOrderPayment(id) {
	const { data } = await api.delete(`/OrderPayment/${id}`);
	return data;
}