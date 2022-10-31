import { createSlice } from '@reduxjs/toolkit';


export type modalState = {
  show: boolean;
  productId: string;
};

const initialState: modalState = {
  show: false,
  productId: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.show = !state.show;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
