import React from 'react';
// import {normalizePathname} from './until';
import { matchRoutes } from 'react-router-dom';
import { NavigationContext, RouteContext } from './context';



export function useRoutes(routes){
    const {pathname} = useLocation();
    const matchs = matchRoutes(routes, {pathname})
    return renderMatches(matchs);
}

function renderMatches(matchs){
    return matchs.reduceRight((outlet, match) => {
        return <RouteContext.Provider children={match.route.element || outlet} value={{outlet, matchs }} />;
    }, null)

}

export function useNavigate(){
    const {history} = React.useContext(NavigationContext)
    const navigate = (to, options = {}) => {
        if(typeof to === 'number'){
            history.go(to)
            return;
        }
        return ( !!options.replace ?history.replace : history.push)(to, options.state)
    }
    return navigate;
}

export function useLocation(){
    const {location} = React.useContext(NavigationContext);
    return location;
}

export function useOutlet(){
    const {outlet} = React.useContext(RouteContext);
    return outlet;
}

export function useParams() {
    const {matchs} = React.useContext(RouteContext)

    console.log(matchs);
}
