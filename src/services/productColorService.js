import api from "./apiService";

//#region Gets
export async function getProductColorById(id) {
    const {data} = await api.get(`/ProductColor/${id}`);
    return data;
}

export async function getAllProductColors() {
    const {data} = await api.get('/ProductColor');
    return data;
}

export async function searchProductColors(searchParams) {
    const {data} = await api.get('/ProductColor/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createProductColor(request) {
	const { data } = await api.post("/ProductColor", request);
	return data;
}

export async function updateProductColor(request) {
	const { data } = await api.put("/ProductColor", request);
	return data;
}

export async function deleteProductColor(id) {
	const { data } = await api.delete(`/ProductColor/${id}`);
	return data;
}