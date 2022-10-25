import React from 'react';

function createRoutesFromChildren(children) {
    let routes = [];
    React.Children.forEach(children, item => {
        let route = {
            path: item.props.path,
            element: item.props.element,
        }
        if(item.props?.children){
            route.children = createRoutesFromChildren(item.props.children)
        }
        routes.push(route)
    })
    return routes;
}

export default createRoutesFromChildren;