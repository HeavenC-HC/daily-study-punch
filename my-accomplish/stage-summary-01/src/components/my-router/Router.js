import React from 'react';
import { NavigationContext } from './context';


function Router({children, location, history}) {
    const NavigateContext = React.useMemo(() => ({location, history}), [location, history])
    return (
        <NavigationContext.Provider value={NavigateContext}>
            {children}
        </NavigationContext.Provider>
    );
}

export default Router;