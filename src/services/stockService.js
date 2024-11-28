import useApiService from "./apiService";

export default function useStockService() {
  const { api } = useApiService();

  //#region Gets
  async function getStockById(id) {
    const { data } = await api.get(`/Stock/${id}`);
    return data;
  }

  async function searchStocks(searchParams) {
    const { data } = await api.get("/Stock/Search", { params: searchParams });
    return data;
  }
  //#endregion

  async function createStock(request) {
    const { data } = await api.post("/Stock", request);
    return data;
  }

  async function updateStock(request) {
    const { data } = await api.put("/Stock", request);
    return data;
  }

  async function deleteStock(id) {
    const { data } = await api.delete(`/Stock/${id}`);
    return data;
  }

  return {
	getStockById,
	searchStocks,
	createStock,
	updateStock,
	deleteStock,
  };
}
