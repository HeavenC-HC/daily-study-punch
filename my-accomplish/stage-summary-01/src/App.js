import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { initLogin } from './action/index';
import './index.less';
import About from './pages/about';
import Home from './pages/home';
import Login from './pages/login';
import User from './pages/user';


function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LayOut />}>
					<Route index path='/' element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='user' element={ <RequireUser><User /></RequireUser>} />
					<Route path='login' element={<Login />} />
				</Route>
			</Routes>
		</Router>
	);
}


function LayOut(){
	return (
		<>
			<Link to='/'>首页</Link>
			<Link to='/about'>关于</Link>
			<Link to='/user'>个人中心</Link>
			<Link to='/login'>登录</Link>
			<Outlet />
		</>
	)
}


function RequireUser({children}){
	const location = useLocation();
	const dispatch = useDispatch();
	const {loginStatus, callback} = useSelector(({login}) => login);

    React.useEffect(()=>{
        if(!loginStatus && callback){
            callback();
			setTimeout(()=>{dispatch(initLogin())}, 300)
        }
    }, [loginStatus, callback])

	if(!loginStatus){
		return <Navigate to='/login' state={{from: location}} replace />
	}
	return children;
}
export default App;
