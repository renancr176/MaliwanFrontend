import useApiService from "./apiService";

export default function useProductService() {
  const { api } = useApiService();

  //#region Gets
  async function getProductById(id) {
    const { data } = await api.get(`/Product/${id}`);
    return data;
  }

  async function searchProducts(searchParams) {
    const { data } = await api.get("/Product/Search", { params: searchParams });
    return data;
  }
  //#endregion

  async function createProduct(request) {
    const { data } = await api.post("/Product", request);
    return data;
  }

  async function updateProduct(request) {
    const { data } = await api.put("/Product", request);
    return data;
  }

  async function deleteProduct(id) {
    const { data } = await api.delete(`/Product/${id}`);
    return data;
  }

  return {
	getProductById,
	searchProducts,
	createProduct,
	updateProduct,
	deleteProduct,
  };
}