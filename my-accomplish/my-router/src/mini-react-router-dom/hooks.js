// useLocation, useNavigate, useParams

import React, { useContext } from "react";
import { matchRoutes } from 'react-router-dom';
import { NavigationContext, RouteContext } from "./Context";

export function useRoutes(routes){
    const location = useLocation();
    let pathname = location.pathname;
    let matchs = matchRoutes(routes,  {pathname});
    return renderMatches(matchs)
}

export function renderMatches(matchs){
    return matchs.reduceRight((outlet, match) => {
        return (
            <RouteContext.Provider
                children={match.route.element || outlet}
                value={{outlet, matchs}}
            />
        )
    }, null)
}


export function useLocation(){
    const {location} = React.useContext(NavigationContext);
    return location;
}


export function useNavigate(){
    const {navigator} = useContext(NavigationContext)
    const navigate = (to, options = {}) => {
        console.info(options)
        if(typeof to === 'number'){
            navigator.go(to);
            return;
        }
        return (!!options.replace ? navigator.replace : navigator.push)(to, options.state);
    }
    return navigate;
}


export function useParams(){
    const {matchs} = useContext(RouteContext);
    return matchs ? matchs[matchs.length - 1].params : {};
}


export function useOutlet(){
    const {outlet} = useContext(RouteContext);
    return outlet;
}