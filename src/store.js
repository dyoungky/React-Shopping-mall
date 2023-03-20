import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice';

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 1, title: 'PLANT BOX', count: 2, price: 1699 },
    { id: 0, title: 'ARUM TABLE LAMP', count: 1, price: 3149 },
  ],
  reducers: {
    addCount(state, action) {
      let selectedNum = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[selectedNum].count++;
      state[selectedNum].price *= state[selectedNum].count;
    },

    removeCount(state, action) {
      let selectedNum = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[selectedNum].count--;
      state[selectedNum].price /= state[selectedNum].count + 1;
    },

    addItem(state, action) {
      let selectedNum = state.findIndex((a) => {
        return a.id === action.payload['id'];
      });

      if (selectedNum >= 0) {
        state[selectedNum].count++;
        state[selectedNum].price *= state[selectedNum].count;
      } else {
        state.push(action.payload);
      }
    },

    removeItem(state, action) {
      state.shift(action.payload);
    },
  },
});

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});

export let { addCount, addItem, removeItem, removeCount, addNewItem } = cart.actions;
