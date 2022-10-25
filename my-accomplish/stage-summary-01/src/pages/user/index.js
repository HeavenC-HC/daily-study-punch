import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from '../../components/my-router';
import { logout } from '../../action';
// import { useDispatch } from 'react-redux';
import { useDispatch } from '../../components/my-react-redux';

function User(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogout = () => {
        dispatch(logout(()=>{
            navigate('/')
        }))
    }

    return (
        <div>
            {/* <h1>用户：{}</h1> */}
            <button onClick={userLogout}>退出登录</button>
        </div>
    )
}

export default User;