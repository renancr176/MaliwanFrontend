import useApiService from "./apiService";

export default function useOrderService() {
  const { api } = useApiService();

  //#region Gets
  async function getOrderById(id) {
    const { data } = await api.get(`/Order/${id}`);
    return data;
  }

  async function searchOrders(searchParams) {
    const { data } = await api.get("/Order/Search", { params: searchParams });
    return data;
  }
  //#endregion

  async function createOrder(request) {
    const { data } = await api.post("/Order", request);
    return data;
  }

  async function deleteOrder(id) {
    const { data } = await api.delete(`/Order/${id}`);
    return data;
  }

  return {
    getOrderById,
    searchOrders,
    createOrder,
    deleteOrder,
  };
}
