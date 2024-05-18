
import { createSlice } from '@reduxjs/toolkit';

export const stockSlice = createSlice({
  name: 'stock',
  initialState: { value :{stockActualPrice:0} 
  },
  reducers: {
    updatePrice(state, action) {
      state.price = action.payload;
    },
  },
});

export const {updatePrice } = stockSlice.actions;

export default stockSlice.reducer;
