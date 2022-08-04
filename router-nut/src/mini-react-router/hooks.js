import { useContext } from "react";
import { NavigationContext, RouteContext } from "./Context";
import Outlet from "./Outlet";
import { normalizePathname } from "./untils";

export function useRoutes(routes) {
    const location = useLocation();
    const pathname = location.pathname;
    return routes.map((route, index) => {
        const match = pathname.startsWith(route.path);
        if(match){
            console.log(route);
            if(route.children){
                return route.children.map(child => {
                    let m = normalizePathname(child.path) === pathname;
                    return m &&
                        <RouteContext.Provider
                            key={index}
                            value={{outlet: child.element}}
                            children={
                                route.element !== undefined ?
                                route.element :
                                <Outlet />
                            }
                        />
                });
            }else{
                let m = normalizePathname(route.path) === pathname;
                return m &&
                    <RouteContext.Provider
                        key={index}
                        value={{outlet: route.element}}
                        children={
                            route.element !== undefined ?
                            route.element :
                            <Outlet />
                        }
                    />
            }
        }
        return match &&
            route.children.map(child => {
                let m = normalizePathname(child.path) === pathname;
                return m &&
                    <RouteContext.Provider
                        value={{outlet: child.element}}
                        children={
                            route.element !== undefined ?
                            route.element :
                            <Outlet />
                        }
                    />
            });
    })
};

export function useNavigate() {
    const {navigator} = useContext(NavigationContext)
    return navigator.push;
}

export function useLocation(props) {
    const {location} = useContext(NavigationContext)
    return location;
}

//渲染chuildren
export function useOutLet(props) {
    const  {outlet} = useContext(RouteContext)
    return outlet;
}

export function useParams(props) {
    return (
        <div>
        </div>
    );
}



