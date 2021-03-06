import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";
const Item = Form.Item;
const Option = Select.Option;
/*
添加分类的Form 组件
*/
const AddForm = ({ onChange, fields,categorys, parentId}) => {
  return (
    <Form
      name="global_state"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
    >
      <Item label="所属分类" name="category">
        <Select>
          <Option key="0" value="0">
            一级分类
          </Option>
          {categorys.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>
      </Item>
      <Item label="分类名称" name="categoryName">
        <Input placeholder="请输入分类名称" />
      </Item>
    </Form>
  );
};
export default AddForm;
