import React from 'react';
import { useNavigate } from './hooks';

function Link({to, children}) {
    const navigate = useNavigate()

    const goToPage = e => {
        e.preventDefault();
        navigate(to)
    }

    return (
        <a href={to} onClick={goToPage}>{children}</a>
    );
}

export default Link;