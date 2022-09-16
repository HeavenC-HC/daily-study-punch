import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../action';

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