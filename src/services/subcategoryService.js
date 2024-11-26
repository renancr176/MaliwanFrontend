import api from "./apiService";

//#region Gets
export async function getSubcategoryById(id) {
    const {data} = await api.get(`/Subcategory/${id}`);
    return data;
}

export async function getAllSubcategorys() {
    const {data} = await api.get('/Subcategory');
    return data;
}

export async function searchSubcategorys(searchParams) {
    const {data} = await api.get('/Subcategory/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createSubcategory(request) {
	const { data } = await api.post("/Subcategory", request);
	return data;
}

export async function updateSubcategory(request) {
	const { data } = await api.put("/Subcategory", request);
	return data;
}

export async function deleteSubcategory(id) {
	const { data } = await api.delete(`/Subcategory/${id}`);
	return data;
}