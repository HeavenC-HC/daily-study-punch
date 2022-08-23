
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
function RequiredAuth({children}) {
    const user = useSelector(({user})=> user);
    const location = useLocation();

    if(user.isLogin){
        return children;
    }else{
        return <Navigate to='/login' state={{from: location}} replace={true} />
    }



}

export default RequiredAuth;