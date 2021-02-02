import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";
const Item = Form.Item;
const Option = Select.Option;
/*
添加分类的Form 组件
*/
const AddForm = ({onChange, fields}) => {
  return (
    <Form
      name="global_state"
      layout="inline"
     fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Username is required!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
export default AddForm;
