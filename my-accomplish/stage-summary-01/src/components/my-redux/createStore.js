
function createStore(reducer, enchancer) {
    let currentState;
    let currentListeners = [];

    if(enchancer){
        return enchancer(createStore)(reducer)
    }

    const getState = () => {
        return currentState;
    }

    const dispatch = (action) => {
        currentState = reducer(currentState, action);
        currentListeners.forEach(item => item())
    }

    const subscribe = (listener) => {
        currentListeners.push(listener);
        return () => {
            currentListeners = currentListeners.filter(item => item !== listener);
        }
    }

    dispatch({type: '@/REDUX/---------------'})

    return {
        getState,
        dispatch,
        subscribe,
    };
}

export default createStore;