import { Button, Input } from "antd";
import React from "react";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { login } from '../../action';
import Form, { FormItem, useForm } from '../../components/my-form';
import store from "../../stroe";



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


export default function Login(){
    const location = useLocation()
    const navigate = useNavigate();
    const [form] = useForm()
    // const dispatch = useDispatch();
    const {loginStatus, callback} = useSelector(({login}) => login);


    //有如下函数， 聚合成一个函数，并把第一个函数的返回值传递给下一个函数，如何处理
    function f1(arg) {
        console.log("f1", arg);
        return arg;
    }
    function f2(arg) {
        console.log("f2", arg);
        return arg;
    }
    function f3(arg) {
        console.log("f3", arg);
        return arg;
    }

    function commpose(...funcs){
        if(funcs.length === 0){
            return arg => arg
        }
        if(funcs.length === 1){
            return funcs[0]
        }
        return funcs.reduce((a, b) => (...arg) =>  {
            // console.log(a);
            // console.log(b);
            // console.log(arg);
            return a(b(...arg))
        })
    }

    commpose()
    commpose()("omg")
    commpose(f1)("omg")
    commpose(f1, f2, f3)("omg")

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
        // dispatch(login(val, ()=>{
        //     const path = location?.state?.from?.pathname ?? '/';
        //     // navigate(path, {replace: true})
        // }))

        store.dispatch(login(val, ()=>{
                const path = location?.state?.from?.pathname ?? '/';
                // navigate(path, {replace: true})
            }))
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