import React, { useCallback, useContext, useState, useSyncExternalStore } from 'react';
import { bindActionCreators } from '../redux-nut';

//1创建coontext对象
const Context = React.createContext();

//2Provider组件传递value (store)
function Provider({store, children}) {
    return (
        <Context.Provider value={store}>

            {children}
        </Context.Provider>
    );
}



//3后代消费Provider传递下来的value
/**
 * contextType 只能用在类组件 只能订阅单一的context的来源
 * useContext 只能用在类组件或者自定义hook
 * Consumer 没有限制，注意使用方式
*/



function connect(mpaStateToprops, mapDispatchToprops) {
    return WrappedComponent => props => {
        const store = useContext(Context)
        const {getState, dispatch, subscribe} = store;
        const forceUpdate = useForceUpdate();


       

        // useLayoutEffect(()=>{
        //     const unsubscribe = subscribe(() => {
        //         forceUpdate();
        //     })
        //     return () => {
        //         unsubscribe();
        //     }
        // }, [subscribe])

        const state = useSyncExternalStore(()=>{
            subscribe(forceUpdate)
        }, getState)

        // const stateProps = mpaStateToprops(getState())
        const stateProps = mpaStateToprops(state)
        let dispatchProps = {dispatch}

        if(typeof mapDispatchToprops === 'function'){
            dispatchProps = mapDispatchToprops(dispatch)
        }else if(typeof mapDispatchToprops === 'object'){
            dispatchProps = bindActionCreators(mapDispatchToprops, dispatch);
        }

        console.info('checked', state === getState())
        return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
    };
}


function useForceUpdate(){
    const [state, setState] = useState(0);

    const update = useCallback(() => {
        setState((pre) => pre + 1)
    }, [])

    return update;
}


function useDispatch(){
    const store = useContext(Context)
    const {dispatch} = store;
    return dispatch;
}

function useSelector(func){
    const store = useContext(Context)
    const {getState, subscribe} = store;
    const forceUpdate = useForceUpdate();
/*     useLayoutEffect(()=>{
        const unsubscribe = subscribe(() => {
            forceUpdate();
        })
        return () => {
            unsubscribe();
        }
    }, [subscribe]) */

    const state = useSyncExternalStore(()=>{
        subscribe(forceUpdate)
    }, getState)

    const selectedState = func(state);
    
    return selectedState;
}

export {
    connect,
    Provider,
    useDispatch,
    useSelector,
};

