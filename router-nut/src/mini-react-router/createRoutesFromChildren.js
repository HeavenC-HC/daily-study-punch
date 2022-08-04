import React from 'react';

export default function createRoutesFromChildren(children) {
    let routes = []
    React.Children.forEach(children, (child) => {
        const route = {
            element: child.props.element,
            path: child.props.path,
        };
        if(child.props.children){
            route.children = createRoutesFromChildren(child.props.children)
        }
        routes.push(route)
    })

    console.info(routes)
    return routes;
};
