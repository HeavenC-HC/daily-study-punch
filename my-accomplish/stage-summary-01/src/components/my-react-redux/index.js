import React, { useCallback, useContext, useState, useSyncExternalStore } from 'react';
import { bindActionCreators } from '../my-redux';
const Context = React.createContext();


function Provider({children, store}){
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    )
}

function connect(mapStateToProps, mapDispatchToProps){
    return WrappedComponent => props => {

        const store = useContext(Context);
        const {getState, dispatch, subscribe} = store;
        let forceUpdate = useForceUpdate()

        const state = useSyncExternalStore(()=>{
            subscribe(forceUpdate)
        }, getState)


        let stateProps = mapStateToProps(state)

        let dispatchProps = {dispatch}
        if(typeof mapDispatchToProps === 'function'){
            dispatchProps = mapDispatchToProps(dispatch)
        }

        if(typeof mapDispatchToProps === 'object'){
            dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
        }

        return <WrappedComponent {...stateProps} {...dispatchProps} {...props} />
    }
}

function useForceUpdate(){
    const [state, setState] = useState(0);
    const update = useCallback(() => {
        setState((pre) => pre + 1)
    }, [])

    return update;
}

function useDispatch(){
    const store = useContext(Context);
    return store.dispatch;
}

function useSelector(func){
    const store = useContext(Context);
    const {getState, subscribe} = store;
    const forceUpdate = useForceUpdate()

    const state = useSyncExternalStore(()=>{
        subscribe(forceUpdate)
    }, getState)


    return func(state)
}



export {
    connect,
    Provider,
    useDispatch,
    useSelector,
};

