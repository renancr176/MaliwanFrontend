import api from "./apiService";

//#region Gets
export async function getProductSizeById(id) {
    const {data} = await api.get(`/ProductSize/${id}`);
    return data;
}

export async function getAllProductSizes() {
    const {data} = await api.get('/ProductSize');
    return data;
}

export async function searchProductSizes(searchParams) {
    const {data} = await api.get('/ProductSize/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createProductSize(request) {
	const { data } = await api.post("/ProductSize", request);
	return data;
}

export async function updateProductSize(request) {
	const { data } = await api.put("/ProductSize", request);
	return data;
}

export async function deleteProductSize(id) {
	const { data } = await api.delete(`/ProductSize/${id}`);
	return data;
}