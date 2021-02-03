

import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";
const Item = Form.Item;
const Option = Select.Option;
/*
添加分类的Form 组件
*/
const UpdateForm = ({ onChange, fields,categoryName,parentId}) => {
  return (
    <Form
      name="global_state"
      layout="inline"
      fields={fields}
      categoryName={categoryName}
      parentId={parentId}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
    >
      <Item label="分类名称" name="categoryName">
        <Input placeholder="请输入分类名称" />
      </Item>
    </Form>
  );
};
export default UpdateForm;
