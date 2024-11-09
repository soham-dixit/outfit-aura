import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { getProductDetailsReducer, getProductsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer,
    user: userReducer
  });

const middleWare = [thunk];

const persistedCartItems = localStorage.getItem('cartItems');
const persistedUser = localStorage.getItem("user"); 
const initialState = {
  cart: {
    cartItems: persistedCartItems
      ? JSON.parse(persistedCartItems)
      : [],
  },
  user: {
    user: persistedUser ? JSON.parse(localStorage.getItem("user")) : null,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;