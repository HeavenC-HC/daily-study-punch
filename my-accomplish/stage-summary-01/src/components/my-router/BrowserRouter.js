import { createBrowserHistory } from 'history';
import React from 'react';
import Router from './Router';

function BrowserRouter({children}) {
    const historyRef = React.useRef(null);
    if(!historyRef.current){
        historyRef.current = createBrowserHistory()
    }
    let history = historyRef.current;
    const [state, setState] = React.useState({location: history.location})

    React.useLayoutEffect(()=>{
        history.listen(setState)
    },[history])

    return (
        <Router children={children} history={history} location={state.location} />
    );
}

export default BrowserRouter;