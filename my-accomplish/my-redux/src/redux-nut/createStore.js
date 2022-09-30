
function createStore(reducer, enhancer) {
    let state;
    let listeners = []

    if(enhancer){
        return enhancer(createStore)(reducer)
    }

    const getState = () => {
        return state;
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    }
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            let index = listeners.indexOf(listener)

            listeners.splice(index, 1);
        }
    }

    dispatch({type: '@/REDUX/---------------'})

    return {
        dispatch,
        getState,
        subscribe,
    }
}

export default createStore;