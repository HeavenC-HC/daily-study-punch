import { createBrowserHistory } from 'history';
import { useLayoutEffect, useRef, useState } from 'react';
import Router from './Router';
function BrowserRouter({children}) {

    //组件卸载之前用
    let historyRef = useRef();
    if(!historyRef.current){
        historyRef.current = createBrowserHistory();
    }
    const history = historyRef.current;
    const [state, setState] = useState({location: history.location})

    useLayoutEffect(() => {
        history.listen(setState)
    }, [history])

    return (
        <Router children={children} navigator={history} location={state.location} />
    );
}

export default BrowserRouter;