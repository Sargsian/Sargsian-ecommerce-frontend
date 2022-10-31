import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../../models/types';
import { compare, shallowComparison } from './../../utils/index';

type cartState = {
  products: CartProduct[];
  isLoading: boolean;
  error: string;
};

const products = JSON.parse(
  localStorage.getItem('cartProducts') || '[]'
) as CartProduct[];

const initialState: cartState = {
  products: products,
  isLoading: false,
  error: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      state.isLoading = false;
      state.error = '';
      const parsedProducts = JSON.parse(
        localStorage.getItem('cartProducts') || '[]'
      );

      const newProduct = action.payload;

      Object.keys(newProduct).forEach(
        (key) =>
          newProduct[key as keyof typeof newProduct] === undefined &&
          delete newProduct[key as keyof typeof newProduct]
      );
      const products: CartProduct[] = parsedProducts.filter(
        (item: CartProduct) => item.productId === newProduct.productId
      );

      if (products.length === 0 || !shallowComparison(products, newProduct)) {
        parsedProducts.push(newProduct);
        localStorage.setItem('cartProducts', JSON.stringify(parsedProducts));
        state.products.push(newProduct);
      } else {
        const updatedProducts = parsedProducts.map((product: CartProduct) => {
          if (
            compare(
              { ...product, quantity: 0, instanceId: 0 },
              { ...newProduct, quantity: 0, instanceId: 0 }
            )
          ) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        });
        localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
        state.products = updatedProducts;
      }
    },
    incrementProduct: (state, action: PayloadAction<number>) => {
      const parsedProducts = JSON.parse(
        localStorage.getItem('cartProducts') || '[]'
      );
      if (parsedProducts.length === 0) return;
      const updatedProducts = parsedProducts.map((product: CartProduct) => {
        if (product.instanceId === action.payload) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        } else {
          return product;
        }
      });
      localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
      state.products = updatedProducts;
    },
    decrementProduct: (state, action: PayloadAction<number>) => {
      const parsedProducts = JSON.parse(
        localStorage.getItem('cartProducts') || '[]'
      );

      if (parsedProducts.length === 0) return;

      const updatedProducts = parsedProducts.reduce(
        (cartProducts: CartProduct[], product: CartProduct) => {
          if (product.instanceId === action.payload && product.quantity > 1) {
            return [
              ...cartProducts,
              { ...product, quantity: product.quantity - 1 },
            ];
          } else if (
            product.instanceId === action.payload &&
            product.quantity <= 1
          ) {
            return cartProducts;
          } else {
            return [...cartProducts, product];
          }
        },
        []
      );
      localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
      state.products = updatedProducts;
    },
  },
});

export const { addToCart, incrementProduct, decrementProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
