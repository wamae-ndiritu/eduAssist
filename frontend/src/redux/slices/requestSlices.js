import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  financialRequests: [],
  financialRequest: {},
  success: false,
  updated: false,
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    resetReqState: (state) => {
      state.error = null;
      state.loading = false;
      state.success =false;
    },
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.updated = false;
    },
    requestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createFinancialRequestSuccess: (state) => {
        state.success = true;
    },
    getFinancialRequestSuccess: (state, action) => {
        state.loading = false;
        state.financialRequests = action.payload;
    },
    getFinancialRequestDetailsSuccess: (state, action) => {
      state.loading = false;
      state.financialRequest = action.payload;
    },
    updateFinancialRequestSuccess: (state) => {
      state.loading = false;
      state.updated = true;
    }
  },
});

export const {
    requestStart,
    requestFail,
    resetReqState,
    createFinancialRequestSuccess,
    getFinancialRequestSuccess,
    getFinancialRequestDetailsSuccess,
    updateFinancialRequestSuccess
} = requestSlice.actions;

export default requestSlice.reducer;
