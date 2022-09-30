
function createStore(reducer, enchancer) {

    console.log(reducer);
    console.log(enchancer);
    if(enchancer){
        return enchancer(createStore)(reducer)
    }
    let currentState;
    let currentListeners = [];

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



    return {
        getState,
        dispatch,
        subscribe,
    };
}

export default createStore;