// import promise from 'redux-promise';
import isPromise from 'is-promise';
// import { applyMiddleware, createStore } from "redux";
import { applyMiddleware, combineReducers, createStore } from "../redux-nut";
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
}), applyMiddleware( thunk, logger));//promise,  logger

export default store;


function logger({getState, dispatch}){
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

function thunk({getState, dispatch}){
  return next => action => {
    if(typeof action === 'function'){
      return action(dispatch)
    }
    return next(action)
  }
}

function promise({getState, dispatch}){
  return next => action => {
    if(isPromise(action)){
      return action.then(dispatch)
    }
    return next(action)
  }
}