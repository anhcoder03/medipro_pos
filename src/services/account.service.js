import axios from "axios";

export const login = (data) => {
  return axios.post("http://localhost:8000/signin", data);
};
export const changePassword = async (
  _id,
  password,
  newPassword,
  accessToken
) => {
  try {
    const response = await axios.put(
      "http://localhost:8000/changePassword",
      {
        _id,
        password,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
