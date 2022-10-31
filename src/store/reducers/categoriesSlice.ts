import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../models/types';

type categoryState = {
  categories: Category[];
  isLoading: boolean;
  error: boolean;
};

const initialState: categoryState = {
  categories: [],
  isLoading: false,
  error: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchingCategories: (state) => {
      state.isLoading = true;
    },
    fetchingCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.isLoading = false;
      state.error = false;
      state.categories = action.payload;
    },
    fetchingCategoriesError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  fetchingCategories,
  fetchingCategoriesSuccess,
  fetchingCategoriesError,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
