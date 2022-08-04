import createRoutesFromChildren from './createRoutesFromChildren';
import { useRoutes } from './hooks';

function Routes({children}) {
    const routes = createRoutesFromChildren(children)
    return useRoutes(routes)
}

export default Routes;