import React from "react";
import './App.css';
import {
  AuthProvider,
  useAuth
} from './auth';
// import { BrowserRouter as Router, Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from './mini-react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='product' element={<Product />} >
              <Route path=':id' element={<ProductDetail />} />
            </Route>
            <Route path='user' element={<RequireUser><User /></RequireUser>} />
            <Route path='login' element={<Login />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;

const CustomLink = ({to, ...options}) => {
  // return <NavLink to={to} {...options} style={({isActive})=> ({color: isActive ? 'red' : 'black'})} />
  return <Link to={to} {...options} style={({isActive})=> ({color: isActive ? 'red' : 'black'})} />
}


function Layout(){
  return (
    <div>
      <CustomLink to='/' >首页</CustomLink>
      <CustomLink to='/product' >商品</CustomLink>
      <CustomLink to='/user' >用户</CustomLink>
      <CustomLink to='/login' >登录</CustomLink>
      <Outlet />
    </div>
  )
}

function Home(){
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

function Product(){
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate('/product/123')
  }
  return (
    <div>
      <h1>Product</h1>
      <button onClick={gotoPage}>go to ProductDetail</button>
      <Outlet />
    </div>
  )
}

function ProductDetail(){
  const location = useLocation();


  const params = useParams();

  return (
    <div>
      <h1>ProductDetail:{params.id}</h1>
    </div>
  )
}

function User(){
  const {user, logout} = useAuth()
  const navigate = useNavigate();
  const userLogout = () => {
    logout(()=>{
      navigate('/')
    })
  }

  return (
    <div>
      <h1>用户：{user}</h1>
      <button onClick={userLogout}>退出登录</button>
    </div>
  )
}


function RequireUser({children}){
  const {user} = useAuth()
  const location = useLocation()

  if(!user){
    return <Navigate to={'/login'} state={{from: location}} replace={true} />
  }

  return children;
}

function Login(){
  const [value, setValue] = React.useState('')
  const {login} = useAuth()
  const location = useLocation()
  const navigate = useNavigate();
  const valueChange = e => {
    setValue(e.target.value)
  }

  
  const userLogin = () => {
    login(value, ()=>{
      
      const path = location?.state?.from?.pathname ?? '/';
      navigate(path, {replace: true})
    })
  }
  return (
    <div>
      <input value={value} onChange={valueChange} />
      <button onClick={userLogin}>登录</button>
    </div>
  )
}

function NoMatch(){
  return (
    <div>
      <h1>NoMatch</h1>
    </div>
  )
}
