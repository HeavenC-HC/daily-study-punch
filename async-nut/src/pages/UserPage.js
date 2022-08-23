import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function UserPage(props) {
    const user = useSelector(({user})=> user);
    const location = useLocation();
    const dispatch = useDispatch()

    if(!user.isLogin){
        return <Navigate to='/' replace={true} />
    }

    const doLogout = () => {
        // dispatch(logout())
    }

    console.info(user)
    return (
        <div>
            <h3>UserPage: {user?.userInfo.username}</h3>
            <button onClick={doLogout}>退出</button>
        </div>
    );
}