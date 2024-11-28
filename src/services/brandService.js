import useApiService from "./apiService";

export default function useBrandService() {
  const { api } = useApiService();

  //#region Gets
  async function getBrandById(id) {
    const { data } = await api.get(`/Brand/${id}`);
    return data;
  }

  async function getAllBrands() {
    const { data } = await api.get("/Brand");
    return data;
  }

  async function searchBrands(searchParams) {
    const { data } = await api.get("/Brand/Search", { params: searchParams });
    return data;
  }
  //#endregion

  async function createBrand(request) {
    const { data } = await api.post("/Brand", request);
    return data;
  }

  async function updateBrand(request) {
    const { data } = await api.put("/Brand", request);
    return data;
  }

  async function deleteBrand(id) {
    const { data } = await api.delete(`/Brand/${id}`);
    return data;
  }

  return {
    getBrandById,
    getAllBrands,
    searchBrands,
    createBrand,
    updateBrand,
    deleteBrand,
  };
}
