import useApiService from "./apiService";

export default function useCategoryService() {
  const { api } = useApiService();
  //#region Gets
  async function getCategoryById(id) {
    const { data } = await api.get(`/Category/${id}`);
    return data;
  }

  async function getAllCategories() {
    const { data } = await api.get("/Category");
    return data;
  }

  async function searchCategories(searchParams) {
    const { data } = await api.get("/Category/Search", {
      params: searchParams,
    });
    return data;
  }
  //#endregion

  async function createCategory(request) {
    const { data } = await api.post("/Category", request);
    return data;
  }

  async function updateCategory(request) {
    const { data } = await api.put("/Category", request);
    return data;
  }

  async function deleteCategory(id) {
    const { data } = await api.delete(`/Category/${id}`);
    return data;
  }
  return {
    getCategoryById,
    getAllCategories,
    searchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
