import React from "react";
import "./login.less";
import { Form, Input, Button, Checkbox,message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { reqLogin } from "../../api/index";
import  memoryUtils from '../../utils/memoryUtils'
class Login extends React.Component {
  formRef = React.createRef();
  //pwdRef=React.createRef();
  onFinish = (values) => {
    console.log(this.value);
    this.login(values["username"], values["password"]);
  };

  login = async (username, password) => {
    console.log("发送登陆的ajax 请求", username, password);
    const result = await reqLogin(username, password);
    console.log("login()", result);
    if (result.status === 0) {
      // 提示登录成功
      message.success("登录成功", 2);
      
      // 保存用户登录信息
      memoryUtils.user = result.data;
      console.log("user",memoryUtils.user)
      // 跳转到主页面
      this.props.history.replace("/");
    } else {
      // 登录失败, 提示错误
      message.error(result.msg);
    }
  };

  render() {
    //const form=Form.form

    return (
      <div className="login">
        <header className="login-header">
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            ref={this.formRef}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  type: "string",
                  min: 4,
                  max: 14,
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "密码不符合规范",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default Login;
