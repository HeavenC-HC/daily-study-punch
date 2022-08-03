import { createBrowserHistory } from 'history';
import { useRef } from 'react';
import Router from './Router';
function BrowserRouter({children}) {

    //组件卸载之前用
    let historyRef = useRef();

    if(!historyRef.current){
        historyRef.current = createBrowserHistory();
    }

    return (
        <Router children={children} navigator={historyRef.current} />
    );
}

export default BrowserRouter;