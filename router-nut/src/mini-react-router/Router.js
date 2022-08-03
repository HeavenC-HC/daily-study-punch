import React, { useMemo } from 'react';
import { NavigationContext } from './Context';

function Router({navigator, children}) {
    let navigationContext = useMemo(() => ({navigator}), [navigator])
    return (
        <NavigationContext.Provider value={navigationContext}>
            {children}
        </NavigationContext.Provider>
    );
}

export default Router;