export default function combineReducers(reducers){
    
    //返回一个总的reducer(presState, action) => 
    return function combination(state = {}, action){
        let nextState = {};
        let hasChange = false;
        for (const key in reducers) {
            const reducer = reducers[key];
            nextState[key] = reducer(state[key], action)

            hasChange = hasChange || nextState[key] !== state[key]
        }

        hasChange = hasChange || Object.keys(nextState).length !== Object.keys(state).lengthl;

        return hasChange ? nextState : state;
    }
}