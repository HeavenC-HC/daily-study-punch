import React from 'react';

export default function createRoutesFromChildren(children) {
    let routes = []
    React.Children.forEach(children, (child) => {
        const {element, path, index = false,} = child.props;
        const route = {
            index,
            element,
            path: (path ?? ''),
        }
        routes.push(route)
        if(child.props.children){
            // routes = routes.concat(createRoutesFromChildren(child.props.children, (pre + path + '/')))
            routes.children = createRoutesFromChildren(child.props.children)
        }
    })
    return routes;
};
