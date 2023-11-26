/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../services/account.service";

export const handleLogin = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const response = await login(data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
