import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, REQUEST } from "../store/const";
import LoginService from './../service/login';

// export const login = (userInfo) => (dispatch) => {
//     dispatch({ type: REQUEST });
//     LoginService.login(userInfo).then(
//         (res) => {
//             // dispatch({type: LOGIN_SUCCESS, payload: res});
//             getMoreUserInfo(dispatch, res);
//         },
//         (err) => {
//             dispatch({ type: LOGIN_FAILURE, payload: err });
//         }
//     );
// };

export const getMoreUserInfo = (dispatch, userInfo) => {
    LoginService.getMoreUserInfo(userInfo).then(
        (res) => {
            dispatch({ type: LOGIN_SUCCESS, payload: res });
        },
        (err) => {
            dispatch({ type: LOGIN_FAILURE, payload: err });
        }
    );
};


export const login = (userInfo) => {
    return async function (dispatch) {
    dispatch({ type: REQUEST });
    // 请求1： 用户登录
    let res1 = await loginPromise(dispatch, userInfo);
    // 请求2： 根据用户基本信息获取详细信息
    if (res1) {
        getMoreUserInfo(dispatch, res1);
    }
    };
};

export const loginPromise = (dispatch, userInfo) => {
    return LoginService.login(userInfo).then(
    (res) => {
        return res;
    },
    (err) => {
        dispatch({ type: LOGIN_FAILURE, payload: err });
    }
    );
};

export const logout = () => ({type: LOGOUT_SUCCESS})