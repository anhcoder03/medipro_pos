import Http from "../helper/http";

const http = new Http();
export const getAllCustomer = async (params: any) => {
  try {
    const response = await http.get(`/customers`, params);
    return response.customers;
  } catch (error) {
    console.error(error);
  }
};
