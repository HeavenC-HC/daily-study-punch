
function compose(...funs) {
    if(funs.length === 0){
        return arg => arg;
    }
    if(funs.length === 1){
        return arg => funs[0](arg);
    }

    return funs.reduce((a, b) => (...args) => a(b(...args)));
}
export default compose;