import React from "react";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from "react-router-dom";
import "./less/login.less"
import img_logo from '../assets/image/pigeon.png'
import { LoginApi } from '../request/api'


//登陸
export default function Login() {
  const navigate = useNavigate() 
  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password: values.password
    }).then(res => {
      if (res.errCode === 0) {
        console.log('Success:', values);
        console.log(res)
        // 存儲數據
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('player', res.data.player)
        // 跳轉到跟路徑
        setTimeout(() => {
          navigate('/list')
        }, 1500)
      } else {
        message.error(res.message)
      }
    })
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

          <Form.Item>
            <Link to={"/register"}>沒有帳號，立即註冊</Link>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登錄
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    
  )
}