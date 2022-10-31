import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './reducers/currencySlice';
import categoryReducer from './reducers/categorySlice';
import categoriesReducer from './reducers/categoriesSlice';
import productReducer from './reducers/productSlice';
import cartReducer from './reducers/cartSlice';
import modalReducer from './reducers/modalSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    category: categoryReducer,
    categories: categoriesReducer,
    product: productReducer,
    cart: cartReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
