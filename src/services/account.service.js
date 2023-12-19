import axios from "axios";

export const login = (data) => {
  return axios.post("https://api-medipro.onrender.com/signin", data);
};
export const changePassword = async (
  _id,
  password,
  newPassword,
  accessToken
) => {
  try {
    const response = await axios.put(
      "https://api-medipro.onrender.com/changePassword",
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
