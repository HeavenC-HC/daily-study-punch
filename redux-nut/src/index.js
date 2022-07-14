import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.less";

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

const root = createRoot(document.getElementById("root")).render(<App />);