import {
  login,
  logout,
  register,
  requestUser,
  requestUpdateUser,
} from "../../utils/API";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("user/login", login);
export const registerUser = createAsyncThunk("user/register", register);
export const logoutUser = createAsyncThunk("user/logout", logout);
export const getUser = createAsyncThunk("user/getUser", requestUser);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  requestUpdateUser,
);

export const checkUserAuth = createAsyncThunk(
  "user/checkUserAuth",
  async (_, thunkAPI) => {
    if (localStorage.getItem("accessToken")) {
      await thunkAPI
        .dispatch(getUser())
        .unwrap()
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        });
    }
  },
);

const initialState = { user: null, isAuthChecked: false };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export default userSlice;
