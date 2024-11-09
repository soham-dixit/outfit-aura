import * as actionType from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const item = action.payload;
      const exist = state.cartItems.find(
        (product) => product.product_id === item.product_id
      );

      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((data) =>
            data.product === exist.product ? item : data
          ),
        };
      } else {
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...state.cartItems, item])
        );
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case actionType.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.product_id !== action.payload
        ),
      };
    default:
      return state;
  }
};
