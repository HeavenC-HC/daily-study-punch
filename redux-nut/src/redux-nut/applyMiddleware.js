
import compose from './compose';
function applyMiddleware(...middlewares) {
    return (createStore) => reducer => {
        const store = createStore(reducer)
        let dispatch = store.dispatch;

        //todo 加强dispatch
        let midApi = {
            getState: store.getState,
            //当前上下文的dispatch
            dispatch: (action, ...arg) => dispatch(action, ...arg),
        }

        const middlewareChain = middlewares.map(middleware => middleware(midApi))

        //加强版的dispatch
        //把所有的中间件的函数都执行了，同时还执行store.dispatch
        dispatch = compose(...middlewareChain)(store.dispatch);
        return {
            ...store,
            dispatch,
        }
    }
}

export default applyMiddleware;