import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const MAX_PRODUCTS = 5;

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUri: string;
};

type ProductsState = {
  items: Product[];
};

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
