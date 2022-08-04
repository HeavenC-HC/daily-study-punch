import React, { useMemo } from 'react';
import { NavigationContext } from './Context';

function Router({navigator, children, location}) {
    let navigationContext = useMemo(() => ({navigator, location}), [navigator, location])
    return (
        <NavigationContext.Provider value={navigationContext}>
            {children}
        </NavigationContext.Provider>
    );
}

export default Router;