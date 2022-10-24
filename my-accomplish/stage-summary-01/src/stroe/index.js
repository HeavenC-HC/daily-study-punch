
// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Types from '../action/type';
import { applyMiddleware, combineReducers, createStore } from '../components/my-redux';

const { LOGIN_SUCCESS, LOGIN_FAUIL, LOGOUT} = Types;

let defaultState = {
  loginStatus: false,
  callback: null
}

export function login(state = defaultState, action) {
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


// const store = createStore(combineReducers({
//     login: loginReducer,
//     count1: countReducer1
// }), applyMiddleware(thunk, logger))
const store = createStore(combineReducers({
  login
}), applyMiddleware(thunk, logger))

export default store;


function logger({dispatch, getState}){
  return next => action => {
    console.info('-------------------------------')
    console.info('执行了', action.type)

    const preState = getState();
    console.info('Pre State', preState)

    let returnValue = next(action);

    const nextState = getState();
    console.info('Next State', nextState)
    console.info('-------------------------------')

    return returnValue;
  }
}