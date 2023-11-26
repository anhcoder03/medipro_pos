import Http from "../helper/http";

const http = new Http();
export const getAllProduct = async (params) => {
  try {
    const response = await http.get(`/medicines`, params);
    return response.medicines;
  } catch (error) {
    console.error(error);
  }
};
