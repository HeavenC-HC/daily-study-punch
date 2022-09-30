import { createRoot } from "react-dom/client";
// import { Provider } from 'react-redux';
import App from "./App";
import "./index.less";
import { Provider } from './react-redux-nut';
import store from './store';

/* 
function f1(arg) {
    console.log("f1", arg);
    return arg;
  }
  function f2(arg) {
    console.log("f2", arg);
    return arg;
  }
  function f3(arg) {
    console.log("f3", arg);
    return arg;
  }

// const res = f1(f2(f3('omg')))

const res = compose(f1, f2, f3)('omg')

console.info(res)

function compose(...funs){
    if(funs.length === 0){
        return arg => arg;
    }
    if(funs.length === 1){
        return arg => funs[0](arg)
    }
    return funs.reduce((a, b) => (...arg) =>  a(b(...arg)))
} */



const root = createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

//根据一维数组生成树
const base = [
  "2-31-52-54",
  "2-31-52-55",
  "2-31-52-56",
  "2-31-53-57",
  "2-31-53-58",
  "2-31-53-59",
  "2-32-11-12",
  "2-32-12-20",
  "2-33-22-21",
  "2-34-27",
  "2-34-23",
  "2-34-24",
  "2-34-25",
  "2-36",
]




