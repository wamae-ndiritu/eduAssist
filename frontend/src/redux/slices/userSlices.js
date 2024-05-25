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
  profileUpdates: {
    personal: false,
    institution: false,
    documents: false,
    profile_pic: false,
  },
  studentsList: [],
  donorsList: [],
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
      state.profileUpdates.personal = false;
      state.profileUpdates.institution = false;
      state.profileUpdates.documents = false;
      state.profileUpdates.profile_pic = false;
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
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.profileUpdates = {...state.profileUpdates, ...action.payload};
    },
    getProfileInfoSuccess: (state, action) => {
      state.loading = false;
      state.profileInfo = action.payload;
    },
    getStudentsSuccess: (state, action) => {
      state.loading = false;
      state.studentsList = action.payload;
    },
    getDonorsSuccess: (state, action) => {
      state.loading = false;
      state.donorsList = action.payload;
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
  getProfileInfoSuccess,
  getDonorsSuccess,
  getStudentsSuccess
} = userSlice.actions;

export default userSlice.reducer;
