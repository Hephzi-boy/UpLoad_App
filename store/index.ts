import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/store/productsSlice';
import toastReducer from '@/store/toastSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
