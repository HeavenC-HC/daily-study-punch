import React from 'react';
import {useNavigate} from './hooks';

function Link({to, children}) {

    const navigate = useNavigate()

    const handle = e => {
        e.preventDefault()
        navigate(to);
    }

    return <a href={to} onClick={handle}>{children}</a>;
}

export default Link;