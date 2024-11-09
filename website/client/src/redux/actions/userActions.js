import * as actionType from '../constants/userConstants';

export const loginUserAction = (user) => (dispatch) => {
    dispatch({ type: actionType.LOGIN_USER, payload: user });
}

export const registerUserAction = (user) => (dispatch) => {
    dispatch({ type: actionType.REGISTER_USER, payload: user });
}

export const logoutUserAction = () => (dispatch) => {
    dispatch({ type: actionType.LOGOUT_USER });
}
