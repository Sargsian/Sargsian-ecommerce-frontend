import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Category, Product } from '../../models/types';

export type categoryState = {
  products: Product[];
  isLoading: boolean;
  error: boolean;
};

const initialState: categoryState = {
  products: [],
  isLoading: false,
  error: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchingCategory: (state) => {
      state.isLoading = true;
    },
    fetchingCategorySuccess: (state, action: PayloadAction<Category>) => {
      state.isLoading = false;
      state.error = false;
      state.products = action.payload.products;
    },
    fetchingCategoryError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  fetchingCategory,
  fetchingCategorySuccess,
  fetchingCategoryError,
} = categorySlice.actions;
export default categorySlice.reducer;
