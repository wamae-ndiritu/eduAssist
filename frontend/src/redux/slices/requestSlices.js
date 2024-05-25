import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  financialRequests: [],
  financialRequest: {},
  success: false,
  updated: false,
  deleted: false,
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    resetReqState: (state) => {
      state.error = null;
      state.loading = false;
      state.success = false;
      state.deleted = false;
    },
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.updated = false;
      state.deleted = false;
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
    },
    deleteFinancialRequestSuccess: (state) => {
      state.loading = false;
      state.deleted = true;
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
    updateFinancialRequestSuccess,
    deleteFinancialRequestSuccess
} = requestSlice.actions;

export default requestSlice.reducer;
