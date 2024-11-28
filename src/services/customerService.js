import useApiService from "./apiService";

export default function useCustomerService() {
  const { api } = useApiService();

  //#region Gets
  async function getCustomerById(id) {
    const { data } = await api.get(`/Customer/${id}`);
    return data;
  }

  async function getAllCustomers() {
    const { data } = await api.get("/Customer");
    return data;
  }

  async function searchCustomers(searchParams) {
    const { data } = await api.get("/Customer/Search", {
      params: searchParams,
    });
    return data;
  }
  //#endregion

  async function createCustomer(request) {
    const { data } = await api.post("/Customer", request);
    return data;
  }

  async function updateCustomer(request) {
    const { data } = await api.put("/Customer", request);
    return data;
  }

  async function deleteCustomer(id) {
    const { data } = await api.delete(`/Customer/${id}`);
    return data;
  }

  return {
    getCustomerById,
    getAllCustomers,
    searchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
