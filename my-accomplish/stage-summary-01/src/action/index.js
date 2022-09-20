import Types from './type';

const { LOGIN_SUCCESS, LOGIN_FAUIL, LOGOUT} = Types;

export const login = (user, callback) => {
    return dispatch => {
        const {username, password} = user;
        if(username === 'admin' && password === '111111'){
            dispatch({
                type: LOGIN_SUCCESS,
                callback
            })
        }else{
            dispatch({
                type: LOGIN_FAUIL,
            })
        }
    }
}

export const logout = callback => {
    return dispatch => {
        dispatch({
            type: LOGOUT,
            callback
        })
    }
}

export const initLogin = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT,
        })
    }
}

