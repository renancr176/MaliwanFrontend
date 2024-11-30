import useApiService from "./apiService";

export default function useSubcategoryService() {
  const { api } = useApiService();

  //#region Gets
  async function getSubcategoryById(id) {
    const { data } = await api.get(`/Subcategory/${id}`);
    return data;
  }

  async function getAllSubcategorys(idCategory) {
    const { data } = await api.get("/Subcategory", { params: { idCategory } });
    return data;
  }

  async function searchSubcategorys(searchParams) {
    const { data } = await api.get("/Subcategory/Search", {
      params: searchParams,
    });
    return data;
  }
  //#endregion

  async function createSubcategory(request) {
    const { data } = await api.post("/Subcategory", request);
    return data;
  }

  async function updateSubcategory(request) {
    const { data } = await api.put("/Subcategory", request);
    return data;
  }

  async function deleteSubcategory(id) {
    const { data } = await api.delete(`/Subcategory/${id}`);
    return data;
  }

  return {
    getSubcategoryById,
    getAllSubcategorys,
    searchSubcategorys,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
  };
}
