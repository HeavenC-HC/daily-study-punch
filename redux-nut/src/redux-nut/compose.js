
function compose(...funcs) {
   if(funcs.length === 0){
    return arg => arg
   }
   if(funcs.length === 1){
    return arg => funcs[0](arg)
   }

   return funcs.reduce((a, b) => (...arg) => {
    // console.info(a)
    // console.info(b)
    // console.info(arg)
    return a(b(...arg))
   })
}

export default compose;