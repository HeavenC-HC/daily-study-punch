
function bindActionCreator(creator, dispatch){
    return (...args) => dispatch(creator(...args))
}

function bindActionCreators(creators, dispatch) {
    let obj = {}
    for (const key in creators) {
        console.info(key)
        obj[key] = bindActionCreator(creators[key], dispatch)
    }

    return obj;
}

export default bindActionCreators;