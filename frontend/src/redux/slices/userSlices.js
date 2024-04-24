import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  error: null,
  userInfo: userInfoFromLocalStorage,
  profileInfo: {},
  profileUpdated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUserState: (state) => {
      state.userInfo = null;
    },
    resetUserErr: (state) => {
      state.error = null;
      state.profileUpdated = false;
    },
    usersActionStart: (state) => {
      state.loading = true;
      state.error = null;
      state.profileUpdated = false;
    },
    usersActionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileSuccess: (state) => {
      state.loading = false;
      state.profileUpdated = true;
    },
    getProfileInfoSuccess: (state, action) => {
      state.loading = false;
      state.profileInfo = action.payload;
    }
  },
});

export const {
  userLoginStart,
  userLoginSuccess,
  userLoginFail,
  clearUserState,
  resetUserErr,
  usersActionStart,
  usersActionFail,
  updateProfileSuccess,
  getProfileInfoSuccess
} = userSlice.actions;

export default userSlice.reducer;
