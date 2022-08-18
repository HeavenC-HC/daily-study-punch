import React from 'react';

function createRoutesFromChildren(children) {
    let routes = [];
    React.Children.forEach(children, item => {
        let route = {
            element: item.props.element,
            path: item.props.path,
        }
        if(item.props?.children){
            route.children = createRoutesFromChildren(item.props.children)
        }
        routes.push(route)
    })
    return routes;
}

export default createRoutesFromChildren;