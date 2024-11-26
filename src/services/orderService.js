import api from "./apiService";

//#region Gets
export async function getOrderById(id) {
    const {data} = await api.get(`/Order/${id}`);
    return data;
}

export async function searchOrders(searchParams) {
    const {data} = await api.get('/Order/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createOrder(request) {
	const { data } = await api.post("/Order", request);
	return data;
}

export async function deleteOrder(id) {
	const { data } = await api.delete(`/Order/${id}`);
	return data;
}