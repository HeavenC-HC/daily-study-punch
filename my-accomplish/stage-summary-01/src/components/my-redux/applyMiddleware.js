
import compose from './compose';
function applyMiddleware(...middlewares) {
    return createstore => reducer => {
        let store = createstore(reducer)
        let dispatch = store.dispatch;
        let midApi = {
            getState: store.getState,
            dispatch: (...arg) => dispatch(...arg)
        }
        const middlewareChain  = middlewares.map(middleware => middleware(midApi))
        dispatch = compose(...middlewareChain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

export default applyMiddleware;