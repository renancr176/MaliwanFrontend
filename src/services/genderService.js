import api from "./apiService";

//#region Gets
export async function getGenderById(id) {
    const {data} = await api.get(`/Gender/${id}`);
    return data;
}

export async function getAllGenders() {
    const {data} = await api.get('/Gender');
    return data;
}

export async function searchGenders(searchParams) {
    const {data} = await api.get('/Gender/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createGender(request) {
	const { data } = await api.post("/Gender", request);
	return data;
}

export async function updateGender(request) {
	const { data } = await api.put("/Gender", request);
	return data;
}

export async function deleteGender(id) {
	const { data } = await api.delete(`/Gender/${id}`);
	return data;
}