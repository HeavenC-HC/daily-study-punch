
function createStore(reducer) {
    let currentState;
    let currentListeners = [];



    function subscribe(listener){
        currentListeners.push(listener)
        return () => {
            // const index = currentListeners.indexOf(listener);
            // currentListeners.splice(index, 1);
            currentListeners = currentListeners.filter(item => item !== listener);
        }
    }
    function dispatch(action){
        currentState = reducer(currentState, action)
        currentListeners.forEach(listener => listener())
    }
    function getState(){
        return currentState;
    }


    dispatch({ type: 'REDUX-------------------'})

    return {
        subscribe,
        dispatch,
        getState,
    }
}

export default createStore;