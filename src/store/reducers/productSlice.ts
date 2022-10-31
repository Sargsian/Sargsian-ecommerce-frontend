import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/types';

export type productState = {
  product: Product;
  isLoading: boolean;
  error: boolean;
};

const initialState: productState = {
  product: {
    id: '',
    name: '',
    inStock: false,
    gallery: [],
    description: '',
    category: '',
    attributes: [],
    prices: [],
    brand: '',
  },
  isLoading: false,
  error: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchingProduct: (state) => {
      state.isLoading = true;
    },
    fetchingProductSuccess: (state, action: PayloadAction<Product>) => {
      state.isLoading = false;
      state.error = false;
      state.product = action.payload;
    },
    fetchingProductError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { fetchingProduct, fetchingProductSuccess, fetchingProductError } =
  productSlice.actions;
export default productSlice.reducer;
