import api from "./apiService";

//#region Gets
export async function getCustomerById(id) {
    const {data} = await api.get(`/Customer/${id}`);
    return data;
}

export async function getAllCustomers() {
    const {data} = await api.get('/Customer');
    return data;
}

export async function searchCustomers(searchParams) {
    const {data} = await api.get('/Customer/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createCustomer(request) {
	const { data } = await api.post("/Customer", request);
	return data;
}

export async function updateCustomer(request) {
	const { data } = await api.put("/Customer", request);
	return data;
}

export async function deleteCustomer(id) {
	const { data } = await api.delete(`/Customer/${id}`);
	return data;
}