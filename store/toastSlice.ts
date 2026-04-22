import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastType = 'success' | 'info' | 'error';

type ToastState = {
  message: string;
  type: ToastType;
  token: number;
};

const initialState: ToastState = {
  message: '',
  type: 'info',
  token: 0,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type?: ToastType;
      }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type ?? 'info';
      state.token += 1;
    },
  },
});

export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;
