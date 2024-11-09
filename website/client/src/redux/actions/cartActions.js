import axios from "../../axios/axios";
import * as actionType from '../constants/cartConstants';

// const URL = 'http://localhost:8000/api/v4/product';

export const addToCart = (id, quantity) => async(dispatch) => {
    try {
        const { data } = await axios.get(`product/product/${id}`);

        dispatch({ type: actionType.ADD_TO_CART, payload: {...data, quantity }});
    } catch (error) {
        dispatch({ type: actionType.ADD_TO_CART_ERROR, payload: error.message });
        // console.log("Error while calling cart api");
    }
}

export const removeFromCart = (id) => (dispatch) => {
    dispatch({ type: actionType.REMOVE_FROM_CART, payload: id });
}