import {
  userLoginFail,
  userLoginStart,
  userLoginSuccess,
  clearUserState,
} from "../slices/userSlices";
import axios from "redaxios";
import { BASE_URL } from "../../URL";


// Register user
export const register = (userInfo) => async (dispatch) => {
  try {
    dispatch(userLoginStart());

    const { data } = await axios.post(`${BASE_URL}/users/create/`, userInfo);

    console.log(data);
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    const errMsg = err?.data ? err.data.message : err.statusText;
    dispatch(userLoginFail(errMsg));
  }
};

// Login user
export const login = (userData) => async (dispatch) => {
  try {
    dispatch(userLoginStart());

    const { data } = await axios.post(`${BASE_URL}/users/login/`, userData);

    console.log(data);
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    const errMsg = err?.data ? err.data.message : err.statusText;
    dispatch(userLoginFail(errMsg));
  }
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch(clearUserState());
  localStorage.removeItem("userInfo");
};