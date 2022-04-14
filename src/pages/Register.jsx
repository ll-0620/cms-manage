import React from "react";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from "react-router-dom";
import "./less/login.less"
import img_logo from '../assets/image/pigeon.png'
import { RegisterApi } from "../request/api";


//註冊
export default function Register() {
    const navigate = useNavigate() 
    const onFinish = (values) => {
      RegisterApi({
        username: values.username,
        password: values.password
      }).then(res => {
        if (res.errCode === 0) {
          message.success('註冊成功')
          console.log(res)
          setTimeout(() => {
            navigate('/list')
          }, 1500)
        } else {
          message.error(res.message)
        }
      }) //跨域
    };  
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <div className="login">
        <div className="login-box">
          <img src={img_logo} alt="logo" />
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="輸入用戶名"/>
            </Form.Item>
  
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="輸入密碼"/>
            </Form.Item>
  
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
  
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="再次確認密碼"
              />
            </Form.Item>
  
            <Form.Item>
              <Link to={"/login"}>已有帳號，點擊登錄</Link>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                用戶註冊
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
  )
}