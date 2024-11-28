import useApiService from "./apiService";

export default function useProductSizeService() {
  const { api } = useApiService();

  //#region Gets
  async function getProductSizeById(id) {
    const { data } = await api.get(`/ProductSize/${id}`);
    return data;
  }

  async function getAllProductSizes() {
    const { data } = await api.get("/ProductSize");
    return data;
  }

  async function searchProductSizes(searchParams) {
    const { data } = await api.get("/ProductSize/Search", {
      params: searchParams,
    });
    return data;
  }
  //#endregion

  async function createProductSize(request) {
    const { data } = await api.post("/ProductSize", request);
    return data;
  }

  async function updateProductSize(request) {
    const { data } = await api.put("/ProductSize", request);
    return data;
  }

  async function deleteProductSize(id) {
    const { data } = await api.delete(`/ProductSize/${id}`);
    return data;
  }

  return {
    getProductSizeById,
    getAllProductSizes,
    searchProductSizes,
    createProductSize,
    updateProductSize,
    deleteProductSize,
  };
}
