import useApiService from "./apiService";

export default function useGenderService() {
  const { api } = useApiService();

  //#region Gets
  async function getGenderById(id) {
    const { data } = await api.get(`/Gender/${id}`);
    return data;
  }

  async function getAllGenders() {
    const { data } = await api.get("/Gender");
    return data;
  }

  async function searchGenders(searchParams) {
    const { data } = await api.get("/Gender/Search", { params: searchParams });
    return data;
  }
  //#endregion

  async function createGender(request) {
    const { data } = await api.post("/Gender", request);
    return data;
  }

  async function updateGender(request) {
    const { data } = await api.put("/Gender", request);
    return data;
  }

  async function deleteGender(id) {
    const { data } = await api.delete(`/Gender/${id}`);
    return data;
  }

  return {
    getGenderById,
    getAllGenders,
    searchGenders,
    createGender,
    updateGender,
    deleteGender,
  };
}
