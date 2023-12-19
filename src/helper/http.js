/* eslint-disable @typescript-eslint/no-explici */
import axios from "axios";
import { store } from "../store/store";
import { authLogout, refreshToken } from "../store/auth/authSlice";
// import { store } from "../stores/app.store";
// import { history } from "./history";

class Http {
  constructor() {
    this.api = axios.create({
      baseURL: `https://api-medipro.onrender.com`,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use((config) => {
      const accessToken = store.getState().auth.auth?.accessToken;
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response && err.response.status === 400) {
          const originalRequest = err.config;
          const refreshTokenz = store.getState().auth.auth?.refreshToken;
          const errorResponseData = err.response.data; // Lấy thông tin lỗi từ phản hồi

          if (errorResponseData.message === "Token đã hết hạn!") {
            try {
              const response = await this.api.post("/refreshToken", {
                refreshToken: refreshTokenz,
              });
              store.dispatch(refreshToken(response.data));
              this.api.defaults.headers.common["Authorization"] =
                response.data.accessToken;
              originalRequest.headers["Authorization"] =
                response.data.accessToken;

              return this.api(originalRequest);
            } catch (error) {
              store.dispatch(authLogout());
            }
          }
        }
        return Promise.reject(err);
      }
    );
  }

  async get(url, params) {
    try {
      const response = await this.api.get(url, { params });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data;
      }
    }
  }
  async post(url, data) {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async update(url, data) {
    try {
      const response = await this.api.put(url, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }

  async patch(url, data) {
    try {
      const response = await this.api.patch(url, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data;
      }
    }
  }

  async delete(url, id) {
    try {
      const response = await this.api.delete(`${url}/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
}

export default Http;
