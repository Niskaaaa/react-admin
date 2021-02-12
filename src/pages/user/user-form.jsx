import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Input, Select } from "antd";

const Option = Select.Option;
/*
用来添加或更新的form 组件
*/
class UserForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    user: PropTypes.object,
    roles: PropTypes.array,
  };
  componentWillMount() {
   
  }
  render() {
  
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const { user, roles } = this.props;
    console.log(user)
    return (
      <Form {...formItemLayout}>
        <Form.Item label="用户名">
       <Input defaultValue={user.username} type="text" placeholder="请输入用户名" />
        </Form.Item>
        
          <Form.Item label="密码" v-if={!user.id}>
           <Input type="password" placeholder="请输入密码" />
          </Form.Item>

        <Form.Item label="手机号">
      <Input type="phone" defaultValue={user.phone} placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item label="邮箱">
        <Input type="email" defaultValue={user.email} placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item label="角色">
      
            <Select style={{ width: 200 }} placeholder="请选择角色" defaultActiveFirstOption={user.role_id}>
              {roles.map((role) => (
                <Option key={role._id} value={role._id}> 
                  {role.name}
                </Option>
              ))}
            </Select>
         
        </Form.Item>
      </Form>
    );
  }
}
export default UserForm;
