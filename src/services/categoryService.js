import api from "./apiService";

//#region Gets
export async function getCategoryById(id) {
    const {data} = await api.get(`/Category/${id}`);
    return data;
}

export async function getAllCategories() {
    const {data} = await api.get('/Category');
    return data;
}

export async function searchCategories(searchParams) {
    const {data} = await api.get('/Category/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createCategory(request) {
	const { data } = await api.post("/Category", request);
	return data;
}

export async function updateCategory(request) {
	const { data } = await api.put("/Category", request);
	return data;
}

export async function deleteCategory(id) {
	const { data } = await api.delete(`/Category/${id}`);
	return data;
}