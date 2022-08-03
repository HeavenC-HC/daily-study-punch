import createRoutesFromChildren from './createRoutesFromChildren';
import {useRoutes} from './hooks';

function Routes({children}) {
    console.info(children)
    const routes = createRoutesFromChildren(children, '/')
    return useRoutes(routes)
}

export default Routes;