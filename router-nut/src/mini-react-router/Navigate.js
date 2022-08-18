import React from 'react';
import { useNavigate } from './hooks';

function Navigate({to, ...options}) {
    const navigate = useNavigate()

    React.useEffect(()=>{
        navigate(to, options)
    }, [])

    return null;
}

export default Navigate;