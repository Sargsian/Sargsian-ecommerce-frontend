import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '../../models/types';

export type currencyState = {
  selectedCurrency: string;
  currencyList: Currency[];
  isLoading: boolean;
  error: boolean;
};

const initialState: currencyState = {
  selectedCurrency: localStorage.getItem('currency') || 'USD',
  currencyList: [{ label: 'USD', symbol: '$' }],
  isLoading: false,
  error: false,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    switchCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
      localStorage.setItem('currency', action.payload);
    },
    fetchingCurrency: (state) => {
      state.isLoading = true;
    },
    fetchingCurrencySuccess: (state, action: PayloadAction<Currency[]>) => {
      state.currencyList = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    fetchingCurrencyError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  switchCurrency,
  fetchingCurrency,
  fetchingCurrencySuccess,
  fetchingCurrencyError,
} = currencySlice.actions;
export default currencySlice.reducer;
