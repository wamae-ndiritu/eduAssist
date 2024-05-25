import {
  userLoginFail,
  userLoginStart,
  userLoginSuccess,
  clearUserState,
  usersActionStart,
  updateProfileSuccess,
  usersActionFail,
  getProfileInfoSuccess,
  getDonorsSuccess,
  getStudentsSuccess,
} from "../slices/userSlices";
import axios from "redaxios";
import { BASE_URL } from "../../URL";

// Register user
export const register = (userInfo) => async (dispatch) => {
  try {
    dispatch(userLoginStart());

    const { data } = await axios.post(`${BASE_URL}/users/create/`, userInfo);

    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    const errMsg = err?.data
      ? err.data.message
        ? err.data.message
        : err.data["email"] || err.data["username"]
      : err.statusText
      ? err.statusText
      : err.message;
    dispatch(userLoginFail(errMsg));
  }
};

// Login user
export const login = (userData) => async (dispatch) => {
  try {
    dispatch(userLoginStart());

    const { data } = await axios.post(`${BASE_URL}/users/login/`, userData);

    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    console.log(err)
    const errMsg = err?.data
      ? err.data.message
        ? err.data.message
        : err.data.message
      : err.statusText
      ? err.statusText
      : err.message;
    dispatch(userLoginFail(errMsg));
  }
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch(clearUserState());
  localStorage.removeItem("userInfo");
};

// Get profile info
export const getProfileInfo = () => async (dispatch, getState) => {
  try {
    dispatch(usersActionStart());

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token?.access}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/users/${userInfo?.user?.user}/`,
      config
    );
    dispatch(getProfileInfoSuccess(data));
  } catch (err) {
    const errMsg =
      err?.data && err?.data?.length
        ? err.data[0]?.message
        : err?.data
        ? err.data?.message || err.data?.detail
        : err.statusText;
    if (
      errMsg === "Authentication credentials were not provided." ||
      errMsg === "Given token not valid for any token type"
    ) {
      dispatch(logout());
      dispatch(usersActionFail("Your session has expired! Login again..."));
    } else {
      dispatch(usersActionFail(errMsg));
    }
  }
};

// Update profile
export const updateProfile =
  (type, profileData) => async (dispatch, getState) => {
    try {
      dispatch(usersActionStart());

      const {
        user: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token?.access}`,
          "Content-Type": "application/json",
        },
      };

      let profileUpdate = {}

      if (type === "personal") {
        const { data } = await axios.patch(
          `${BASE_URL}/users/${userInfo?.user?.user}/update/personal-info/`,
          profileData,
          config
        );
        profileUpdate = data;
      } else if (type === "institution") {
        const { data } = await axios.patch(
          `${BASE_URL}/users/${userInfo?.user?.user}/update/institution-info/`,
          profileData,
          config
        );
        profileUpdate = data;
      } else if (type === "documents") {
        const { data } = await axios.patch(
          `${BASE_URL}/users/${userInfo?.user?.user}/update/documents/`,
          profileData,
          config
        );
        profileUpdate = data;
      } else if (type === "profilePicture") {
        const { data } = await axios.patch(
          `${BASE_URL}/users/${userInfo?.user?.user}/update/picture/`,
          profileData,
          config
        );
        profileUpdate = data;
      }
      dispatch(updateProfileSuccess(profileUpdate));
    } catch (err) {
      const errMsg =
        err?.data && err?.data?.length
          ? err.data[0]?.message
          : err?.data
          ? err.data?.message || err.data?.detail
          : err.statusText;
      if (
        errMsg === "Authentication credentials were not provided." ||
        errMsg === "Given token not valid for any token type"
      ) {
        dispatch(logout());
        dispatch(usersActionFail("Your session has expired! Login again..."));
      } else {
        dispatch(usersActionFail(errMsg));
      }
    }
  };


// Get donors
export const listDonors = () => async (dispatch, getState) => {
  try {
    dispatch(usersActionStart());

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token?.access}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/users/donors/`,
      config
    );
    dispatch(getDonorsSuccess(data));
  } catch (err) {
    const errMsg =
      err?.data && err?.data?.length
        ? err.data[0]?.message
        : err?.data
        ? err.data?.message || err.data?.detail
        : err.statusText;
    if (
      errMsg === "Authentication credentials were not provided." ||
      errMsg === "Given token not valid for any token type"
    ) {
      dispatch(logout());
      dispatch(usersActionFail("Your session has expired! Login again..."));
    } else {
      dispatch(usersActionFail(errMsg));
    }
  }
};

// Get All Beneficiaries
export const listBeneficiaries = () => async (dispatch, getState) => {
  try {
    dispatch(usersActionStart());

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token?.access}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/users/beneficiaries/`,
      config
    );
    dispatch(getStudentsSuccess(data));
  } catch (err) {
    const errMsg =
      err?.data && err?.data?.length
        ? err.data[0]?.message
        : err?.data
        ? err.data?.message || err.data?.detail
        : err.statusText;
    if (
      errMsg === "Authentication credentials were not provided." ||
      errMsg === "Given token not valid for any token type"
    ) {
      dispatch(logout());
      dispatch(usersActionFail("Your session has expired! Login again..."));
    } else {
      dispatch(usersActionFail(errMsg));
    }
  }
};