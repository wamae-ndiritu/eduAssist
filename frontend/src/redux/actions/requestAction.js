import { BASE_URL } from "../../URL";
import { createFinancialRequestSuccess, getFinancialRequestDetailsSuccess, getFinancialRequestSuccess, requestFail, requestStart } from "../slices/requestSlices";
import axios from "redaxios";
import { logout } from "./userActions";

export const createFinancialRequest = (requestData) => async(dispatch, getState) => {
   try {
    dispatch(requestStart());

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token?.access}`,
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `${BASE_URL}/financial-requests/create/`,
      requestData,
      config
    );
    dispatch(createFinancialRequestSuccess());
  } catch (err) {
    console.log(err)
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
      dispatch(requestFail("Your session has expired! Login again..."));
    } else {
      dispatch(requestFail(errMsg));
    }
  }
}

export const getFinancialRequests = () => async (dispatch, getState) => {
  try {
    dispatch(requestStart());

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token?.access}`,
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.get(`${BASE_URL}/financial-requests/`, config);
    dispatch(getFinancialRequestSuccess(data));
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
      dispatch(requestFail("Your session has expired! Login again..."));
    } else {
      dispatch(requestFail(errMsg));
    }
  }
};

// Get FinancialRequest details
export const getFinancialRequestDetails = (requestId) => async (dispatch, getState) => {
  try {
    dispatch(requestStart());

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token?.access}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${BASE_URL}/financial-requests/${requestId}/`, config);
    dispatch(getFinancialRequestDetailsSuccess(data));
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
      dispatch(requestFail("Your session has expired! Login again..."));
    } else {
      dispatch(requestFail(errMsg));
    }
  }
};