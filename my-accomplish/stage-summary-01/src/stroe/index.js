
import { applyMiddleware, combineReducers, createStore } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Types from '../action/type';

const { LOGIN_SUCCESS, LOGIN_FAUIL, LOGOUT} = Types;

let defaultState = {
  loginStatus: false,
  callback: null
}

export function loginReducer(state = defaultState, action) {
  console.info(action)
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          loginStatus: true,
          callback: action.callback
        };
      case LOGIN_FAUIL:
        return {
          ...defaultState
        };
      case LOGOUT:
        return {
          loginStatus: false,
          callback: action.callback
        };
      default:
        return state;
    }
  }

  function countReducer1(state = 0, action) {
    switch (action.type) {
      case "ADD":
        return state + 1;
      case "MINUS":
        return state - 1;
      default:
        return state;
    }
  }


const store = createStore(combineReducers({
    login: loginReducer,
    count1: countReducer1
}), applyMiddleware(thunk, logger))

export default store;


function logger(dispatch){
  return next => action => {
    console.log(dispatch);
    console.log(next);
    console.log(action);
  }
}