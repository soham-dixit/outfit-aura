import * as actionType from '../constants/userConstants';

const initialState = {
    user: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_USER:
            // set the user in localstorage
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload };
        case actionType.REGISTER_USER:
            // set the user in localstorage
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload };
        case actionType.LOGOUT_USER:
            // remove the user from localstorage
            localStorage.removeItem('user');
            localStorage.removeItem('cartItems');
            return { ...state, user: null, cartItems: [] };
        default:
            return state;
    }
}