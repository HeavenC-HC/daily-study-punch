import { Button, Input } from "antd";
import React from "react";
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from "react-router-dom";
import { useLocation, useNavigate } from "../../components/my-router";
import { bindActionCreators } from 'redux';
import { login } from '../../action';
import Form, { FormItem, useForm } from '../../components/my-form';
import { connect, useDispatch, useSelector } from '../../components/my-react-redux';



const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

/* export default class Login extends React.Component {
    formRef = React.createRef();

    componentDidMount() {
        this.formRef.current.setFieldsValue({ username: "defalut" });
    }
    onFinish = (val) => {
         //sy-log
    };
    onFinishFailed = (val) => {
        console.log("onFinishFailed", val); //sy-log
    };
    render() {
        return (
            <div>
                <h3>Login</h3>
                <Form
                ref={this.formRef}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                >
                    <FormItem name="username" label="姓名" rules={[nameRules]}>
                        <Input placeholder="username placeholder" />
                    </FormItem>
                    <FormItem name="password" label="密码" rules={[passworRules]}>
                        <Input placeholder="password placeholder" />
                    </FormItem>
                    <Button type="primary" size="large" htmlType="submit">
                    Submit
                    </Button>
                </Form>
            </div>
        );
    }
} */

export function Login1(){

    const location = useLocation()
    const navigate = useNavigate();
    const [form] = useForm()
    const dispatch = useDispatch();
    const {loginStatus, callback} = useSelector(({login}) => login)

    React.useEffect(()=>{
        form.setFieldsValue({ username: "admin", password: '111111' });
    }, [])

    React.useEffect(()=>{
        if(loginStatus && callback){
            callback();
        }
    }, [loginStatus, callback])

    const onFinish = (val) => {
         //sy-log
        dispatch(login(val, ()=>{
            const path = location?.state?.from?.pathname ?? '/';
            navigate(path, {replace: true})
        }))

        // store.dispatch(login(val, ()=>{
        //         const path = location?.state?.from?.pathname ?? '/';
        //         navigate(path, {replace: true})
        //     }))
    };

    const onFinishFailed = (val) => {
         console.log("onFinishFailed", val); //sy-log
    };

    return (
        <div>
            <h3>Login</h3>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <FormItem name="username" label="姓名" rules={[nameRules]}>
                    <Input placeholder="username placeholder" />
                </FormItem>
                <FormItem name="password" label="密码" rules={[passworRules]}>
                    <Input placeholder="password placeholder" />
                </FormItem>
                <Button type="primary" size="large" htmlType="submit">
                Submit
                </Button>
            </Form>
        </div>
    );
}

const mapStateToProps = ({login}) => {
    return ({
        login
    })
}
const mapDispatchToProps = (dispatch) => {
    console.log(dispatch);
    let creators = {
        doLogin: (val, callback) => {
            console.log(val, callback);
            return login(val, callback)
        },
    }
    creators = bindActionCreators(creators, dispatch)
    return ({
        // doLogin: (val, callback) => dispatch(login(val, callback)),
        ...creators
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(function Login(props){

    const location = useLocation()
    const navigate = useNavigate();
    const [form] = useForm()
    const dispatch = useDispatch();
    const {loginStatus, callback} = props.login;

    React.useEffect(()=>{
        form.setFieldsValue({ username: "admin", password: '111111' });
    }, [])

    React.useEffect(()=>{
        if(loginStatus && callback){
            callback();
        }
    }, [loginStatus, callback])

    const onFinish = (val) => {
        props.doLogin(val, ()=>{
            const path = location?.state?.from?.pathname ?? '/';
            navigate(path, {replace: true})
        })
    };

    const onFinishFailed = (val) => {
         console.log("onFinishFailed", val); //sy-log
    };

    return (
        <div>
            <h3>Login</h3>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <FormItem name="username" label="姓名" rules={[nameRules]}>
                    <Input placeholder="username placeholder" />
                </FormItem>
                <FormItem name="password" label="密码" rules={[passworRules]}>
                    <Input placeholder="password placeholder" />
                </FormItem>
                <Button type="primary" size="large" htmlType="submit">
                Submit
                </Button>
            </Form>
        </div>
    );
})