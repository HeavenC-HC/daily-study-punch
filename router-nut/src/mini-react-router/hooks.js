import { useContext } from "react";
import { NavigationContext } from "./Context";

export function useRoutes(routes) {
    const pathname = window.location.pathname;

    return routes.map(route => {
        // const match = (pathname === route.path || pathname === '/' + route.path);
        const match = pathname.startsWith(route.path);
        console.info(route.path)

        return match ? route.element : null;
    })
};

export function useNavigate() {

    const {navigator} = useContext(NavigationContext)

    return navigator.push;
}

export function useParams(props) {
    return (
        <div>
            
        </div>
    );
}