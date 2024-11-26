import api from "./apiService";

//#region Gets
export async function getProductById(id) {
    const {data} = await api.get(`/Product/${id}`);
    return data;
}

export async function searchProducts(searchParams) {
    const {data} = await api.get('/Product/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createProduct(request) {
	const { data } = await api.post("/Product", request);
	return data;
}

export async function updateProduct(request) {
	const { data } = await api.put("/Product", request);
	return data;
}

export async function deleteProduct(id) {
	const { data } = await api.delete(`/Product/${id}`);
	return data;
}