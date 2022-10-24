
export default function bindActionCreators(creators, dispatch) {

    let obj = {};

    Object.keys(creators).forEach(key => {
        obj[key] = bindActionCreator(creators[key], dispatch)
    })
    return obj;
}


function bindActionCreator(creator, dispatch){
    return dispatch(creator)
} 