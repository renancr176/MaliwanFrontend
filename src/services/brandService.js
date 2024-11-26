import api from "./apiService";

//#region Gets
export async function getBrandById(id) {
    const {data} = await api.get(`/Brand/${id}`);
    return data;
}

export async function getAllBrands() {
    const {data} = await api.get('/Brand');
    return data;
}

export async function searchBrands(searchParams) {
    const {data} = await api.get('/Brand/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createBrand(request) {
	const { data } = await api.post("/Brand", request);
	return data;
}

export async function updateBrand(request) {
	const { data } = await api.put("/Brand", request);
	return data;
}

export async function deleteBrand(id) {
	const { data } = await api.delete(`/Brand/${id}`);
	return data;
}