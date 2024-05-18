
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { value :{ isAuthenticated: false, token: null, email: ''} 
  },
  reducers: {
    login: (state,action) => {
      state.value=action.payload 
    },
    logout: (state) => {
      state.value.isAuthenticated = false;
      state.value.token = null;
      state.value.email = ''; 
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
