import compose from "./compose";

function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer);
        let dispatch = store.dispatch;

        let midApi = {
            getState: store.getState,
            dispatch: (...arg) => dispatch(...arg)
        }

        let chain = middlewares.map(middleware => middleware(midApi))

        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch
        }
    }

}

export default applyMiddleware;