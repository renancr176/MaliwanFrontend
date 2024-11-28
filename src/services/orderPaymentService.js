import useApiService from "./apiService";

export default function useOrderPaymentService() {
  const { api } = useApiService();

  //#region Gets
  async function getOrderPaymentById(id) {
    const { data } = await api.get(`/OrderPayment/${id}`);
    return data;
  }

  async function getOrderPaymentByIdOrder(idOrder) {
    const { data } = await api.get(`/OrderPayment/Order/${idOrder}`);
    return data;
  }

  async function searchOrderPayments(searchParams) {
    const { data } = await api.get("/OrderPayment/Search", {
      params: searchParams,
    });
    return data;
  }
  //#endregion

  async function createOrderPayment(request) {
    const { data } = await api.post("/OrderPayment", request);
    return data;
  }

  async function updateOrderPayment(request) {
    const { data } = await api.put("/OrderPayment", request);
    return data;
  }

  async function deleteOrderPayment(id) {
    const { data } = await api.delete(`/OrderPayment/${id}`);
    return data;
  }

  return {
    getOrderPaymentById,
    getOrderPaymentByIdOrder,
    searchOrderPayments,
    createOrderPayment,
    updateOrderPayment,
    deleteOrderPayment,
  };
}
