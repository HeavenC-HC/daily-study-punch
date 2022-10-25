import React from 'react';
import { useNavigate } from './hooks';

function Navigate({to, state, replace}) {
    const navigate = useNavigate()

    React.useEffect(()=>{
        navigate(to, {state, replace})
    }, [])
    return null;
}

export default Navigate;