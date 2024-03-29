import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { login } from './../aciotn/user';

export default function LoginPage(props) {
    const user = useSelector(({user})=> user);
    const location = useLocation();
    const dispatch = useDispatch();

    const from = location.state?.from.pathname || '/';
    if(user.isLogin){
        return <Navigate to={from}  replace={true} />
    }

    const doLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username')
        dispatch(login({username}))
    }

    return (
        <div>
            <h3>LoginPage</h3>
            <form onSubmit={doLogin}>
                <input type={'text'} name='username' />
                <button type='submit'>{user.loading ? 'loading...' : 'login'}</button>
            </form>
            <p className='red'>{user?.err.msg}</p>
        </div>
    );
}