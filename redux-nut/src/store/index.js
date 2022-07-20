import { applyMiddleware, combineReducers, createStore } from "redux";
// import promise from 'redux-promise';
import isPromise from 'is-promise';
// import { applyMiddleware, combineReducers, createStore } from "../redux-nut";
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';


export function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
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
  count: countReducer,
  count1: countReducer1,
}), applyMiddleware( thunk));//promise,  logger

export default store;


function logger({getState, dispatch}){
  console.info('11')
  return next => action => {
    console.info(next)
    console.info(action)
    console.log('-----------------------------');
    console.log(action.type + '执行了');
    const preState = getState();
    console.log('prev State', preState);
    const returnValue = next(action);
    const nextState = getState();
    console.log('next State', nextState);
    console.log('-----------------------------');

    return returnValue;
  }
}

function thunk({getState, dispatch}){
  return next => action => {
    if(typeof action === 'function'){
      return action(dispatch, getState)
    }
    return next(action)
  }

}

function promise({getState, dispatch}){
  return next => action => {
    if(isPromise(action)){
      action.then(dispatch)
    }else{

    }
  }
}