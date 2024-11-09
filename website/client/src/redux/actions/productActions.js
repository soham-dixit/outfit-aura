import axios from "../../axios/axios";

import * as actionTypes from '../constants/productConstants'


export const getProducts = () => async(dispatch) => {
    try {
        const { data } = await axios.get(`product/products`);
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message });
    }
}

export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`product/product/${id}`);
        console.log("In redux: ", id, URL);
        console.log("In redux data is: ", data);

        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.message });
    }
}