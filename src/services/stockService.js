import api from "./apiService";

//#region Gets
export async function getStockById(id) {
    const {data} = await api.get(`/Stock/${id}`);
    return data;
}

export async function searchStocks(searchParams) {
    const {data} = await api.get('/Stock/Search', { params: searchParams });
    return data;
}
//#endregion

export async function createStock(request) {
	const { data } = await api.post("/Stock", request);
	return data;
}

export async function updateStock(request) {
	const { data } = await api.put("/Stock", request);
	return data;
}

export async function deleteStock(id) {
	const { data } = await api.delete(`/Stock/${id}`);
	return data;
}