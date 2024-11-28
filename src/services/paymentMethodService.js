import useApiService from "./apiService";

export default function usePaymentMethodService() {
  const { api } = useApiService();

  //#region Gets
  async function getPaymentMethodById(id) {
    const { data } = await api.get(`/PaymentMethod/${id}`);
    return data;
  }

  async function getAllPaymentMethods() {
    const { data } = await api.get("/PaymentMethod");
    return data;
  }

  async function searchPaymentMethods(searchParams) {
    const { data } = await api.get("/PaymentMethod/Search", {
      params: searchParams,
    });
    return data;
  }
  //#endregion

  async function createPaymentMethod(request) {
    const { data } = await api.post("/PaymentMethod", request);
    return data;
  }

  async function updatePaymentMethod(request) {
    const { data } = await api.put("/PaymentMethod", request);
    return data;
  }

  async function deletePaymentMethod(id) {
    const { data } = await api.delete(`/PaymentMethod/${id}`);
    return data;
  }
  
  return {
    getPaymentMethodById,
    getAllPaymentMethods,
    searchPaymentMethods,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
  };
}
