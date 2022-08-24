import { applyMiddleware, combineReducers, createStore } from "redux";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../aciotn/rootSaga";
import { loginReducer } from "./loginReducer";


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({ user: loginReducer }),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)

export default store;