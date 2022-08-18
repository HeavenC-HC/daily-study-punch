import React from "react";
import { matchPath, matchRoutes } from 'react-router-dom';
import { NavigationContext, RouteContext } from './Context';

export const useRoutes = (routes) => {
    const {pathname} = useLocation();
    let matchs = matchRoutes(routes, {pathname})
    return renderMatches(matchs)
}

const renderMatches = matchs => {
    return matchs.reduceRight((outlet, match) => {
        return <RouteContext.Provider children={match.route.element || outlet} value={{outlet, matchs}} />;
    }, null)
}

export const useLocation = () => {
    const {location} = React.useContext(NavigationContext)
    return location;
}

export const useNavigate = () => {
    const {navigator} = React.useContext(NavigationContext)
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

export const useParams = () => {
    const {matchs} = React.useContext(RouteContext);
    return matchs ? matchs[matchs.length - 1].params : {};
}

export const useOutlet = () => {
    const {outlet} = React.useContext(RouteContext);
    return outlet;
}

export const useResolvedPath = (to) => {
    let { matches } = React.useContext(RouteContext);
    let { pathname } = useLocation();
    let routePathnamesJson = JSON.stringify(
        matches.map((match) => match.pathnameBase)
    );

    return React.useMemo(
        () => ({ pathname: to, hash: "", search: "" }), //resolveTo(to, JSON.parse(routePathnamesJson), locationPathname),
        [routePathnamesJson, pathname]
      );
}

export const useMatch = (pattern) => {
    const {pathname} = useLocation();
    return React.useMemo(() => matchPath(pattern, pathname), [pathname, pattern]);
}



