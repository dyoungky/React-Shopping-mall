import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice';

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 1, title: 'PLANT BOX', count: 1, price: 1699 },
    { id: 4, title: 'DAY CLOTHS | SÆT AF 7', count: 1, price: 399 },
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
      state.push(action.payload);
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

export let { addCount, addItem, removeItem, removeCount } = cart.actions;
