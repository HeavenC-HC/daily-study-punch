import { Button, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { login } from '../../action';
import Form, { FormItem, useForm } from '../../components/my-form';



const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

// export default class Login extends Component {
//     formRef = React.createRef();

//     componentDidMount() {
//         this.formRef.current.setFieldsValue({ username: "defalut" });
//     }
//     onFinish = (val) => {
//          //sy-log
//     };
//     onFinishFailed = (val) => {
//          //sy-log
//     };
//     render() {
//         return (
//             <div>
//                 <h3>Login</h3>
//                 <Form
//                 ref={this.formRef}
//                 onFinish={this.onFinish}
//                 onFinishFailed={this.onFinishFailed}
//                 >
//                 <FormItem name="username" label="姓名" rules={[nameRules]}>
//                     <Input placeholder="username placeholder" />
//                 </FormItem>
//                 <FormItem name="password" label="密码" rules={[passworRules]}>
//                     <Input placeholder="password placeholder" />
//                 </FormItem>
//                 <FormItem>
//                     <Button type="primary" size="large" htmlType="submit">
//                     Submit
//                     </Button>
//                 </FormItem>
//                 </Form>
//             </div>
//         );
//     }
// }


export default function Login(){
    const location = useLocation()
    const navigate = useNavigate();
    const [form] = useForm()
    const dispatch = useDispatch();
    const {loginStatus, callback} = useSelector(({login}) => login);


    React.useEffect(()=>{
        form.setFieldsValue({ username: "admin" });
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
    };

    const onFinishFailed = (val) => {
         //sy-log
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
            <FormItem>
                <Button type="primary" size="large" htmlType="submit">
                    Submit
                </Button>
            </FormItem>
            </Form>
        </div>
    );
}