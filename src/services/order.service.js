import Http from "../helper/http";

const http = new Http();
export const addOrder = async (data) => {
  try {
    const response = await http.post(`/orders`, data);
    return response;
  } catch (error) {
    return error;
  }
};
