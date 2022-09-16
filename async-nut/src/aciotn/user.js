import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, REQUEST, LOGIN_SAGA } from "../store/const";
import LoginService from './../service/login';

export const login = (userInfo) => ({type: LOGIN_SAGA, payload: userInfo})






export const logout = () => ({type: LOGOUT_SUCCESS})