import React from 'react';
import { NavigationContext } from './Context';

function Router({children, navigator, location}) {

    const NavigateContext = React.useMemo(()=>({navigator, location}), [navigator, location])

    return (
        <NavigationContext.Provider value={NavigateContext}>
            {children}
        </NavigationContext.Provider>
    );
}

export default Router;