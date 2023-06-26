import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productInCart = state.cart.find((product) => product.id === action.payload.id);

      if (!!productInCart) {
        productInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => {
        if (action.payload.id === product.id) product.quantity--;
        return product.quantity > 0;
      });
    },
  },
});

export default cartSlice;
export const { addToCart, deleteFromCart } = cartSlice.actions;
