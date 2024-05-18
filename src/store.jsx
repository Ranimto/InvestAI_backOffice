import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authRedux/Features/auth/auth';
import stockReducer from './authRedux/Features/auth/stock';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stock: stockReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Active DevTools en mode Dev
});
