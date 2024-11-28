import useApiService from "./apiService";

export default function useProductColorService() {
  const { api } = useApiService();

  //#region Gets
  async function getProductColorById(id) {
    const { data } = await api.get(`/ProductColor/${id}`);
    return data;
  }

  async function getAllProductColors() {
    const { data } = await api.get("/ProductColor");
    return data;
  }

  async function searchProductColors(searchParams) {
    const { data } = await api.get("/ProductColor/Search", {
      params: searchParams,
    });
    return data;
  }
  //#endregion

  async function createProductColor(request) {
    const { data } = await api.post("/ProductColor", request);
    return data;
  }

  async function updateProductColor(request) {
    const { data } = await api.put("/ProductColor", request);
    return data;
  }

  async function deleteProductColor(id) {
    const { data } = await api.delete(`/ProductColor/${id}`);
    return data;
  }

  return {
    getProductColorById,
    getAllProductColors,
    searchProductColors,
    createProductColor,
    updateProductColor,
    deleteProductColor,
  };
}