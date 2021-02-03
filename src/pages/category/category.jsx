import React, { Component } from "react";
import { Card, Table, Button, message, Modal } from "antd";
import {
  StarOutlined,
  StarFilled,
  StarTwoTone,
  CodeSandboxCircleFilled,
} from "@ant-design/icons";
import UpdateForm from "./update-form";
import AddForm from "./add-form";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqAddCategory, reqUpdateCategory } from "../../api";
/*
分类管理路由组件
*/
export default class Category extends Component {
  state = {
    categorys: [], // 一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: "0", // 父分类的ID
    parentName: "", // 父分类的名称
    loading: false, // 标识是否正在加载中
    showStatus: 0, // 是否显示对话框0: 都不显示, 1: 显示添加, 2: 显示更新
    cate: "",
    cateName: "",
  };
  /*
根据parentId 异步获取分类列表显示
*/
  getCategorys = async (parentId) => {
    // 更新loading 状态: 加载中
    this.setState({
      loading: true,
    });
    console.log("get");
    // 优先使用指定的parentId, 如果没有指定使用状态中的parentId
    parentId = parentId || this.state.parentId;
    // 异步获取分类列表
    const result = await reqCategorys(parentId); // {status: 0, data: []}
    console.log("par", parentId);
    // 更新loading 状态: 加载完成
    this.setState({
      loading: false,
    });
    console.log("res", result);
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        // 更新一级分类列表
        this.setState({
          categorys,
        });
        console.log("cate", categorys);
      } else {
        // 更新二级分类列表
        this.setState({
          subCategorys: categorys,
        });
      }
    } else {
      // 获取列表失败
      message.error("获取列表失败");
    }
  };
  /*
    显示指定分类的子分类列表
    */
  showSubCates = (category) => {
    // console.log('set 之前', this.state.parentId) // 0
    // 更新状态: state 中的数据是异步更新(不会立即更新state 中的数据)
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        // 在状态更新之后执行, 在回调函数中能得到最新的状态数据
        this.getCategorys();
      }
    );
    // console.log('set 之后', this.state.parentId) // xxx
  };
  /*
    显示一级列表
    */
  showCategorys = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
      showStatus: 0,
      form: {},
    });
  };
  showAdd = () => {
    this.setState({
      showStatus: 1,
    });
  };
  /*
        显示修改的对话框
        */
  showUpdate = (category) => {
    console.log('this',category)
    // 保存category
    this.category = category;
    // 更新状态
    this.setState({
      showStatus: 2,
    });
  };
  /*
        添加分类
        */
  addCategory = async () => {
    // 得到数据
    // const { parentId, categoryName } = this.form.getFieldsValue();
    // 关闭对话框
    this.setState({
      showStatus: 0,
    });
    // 重置表单
    // this.form.resetFields();
    // 异步请求添加分类
    console.log("id", this.state.cate);
    console.log(this.state.cateName);
    const result = await reqAddCategory(
      this.state.cate,
      this.state.cateName
    );
    if (result.status === 0) {
      /*
        添加一级分类
        在当前分类列表下添加
        */
      if ( this.state.cate === this.state.parentId) {
        this.getCategorys();
      }
    }
  };
  /*
更新分类
*/
  updateCategory = async () => {
    // 得到数据
    const categoryId = this.state.cate._id;
    const categoryName  = this.state.cateName;
    // 关闭对话框
    this.setState({
      showStatus: 0,
    });
    console.log('id',this.state.cate._id)
    // 重置表单
 //   this.form.resetFields();
    // 异步请求更新分类
    const result = await reqUpdateCategory({ categoryId, categoryName });
    if (result.status === 0) {
 //     this.setState({ cate: "",cateName:"" });
      // 重新获取列表
      this.getCategorys();
    }
  };

  componentWillMount() {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
      },
      {
        title: "操作",
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>
              修改分类
            </LinkButton>
            &nbsp;&nbsp;&nbsp;
            {this.state.parentId === "0" ? (
              <LinkButton onClick={() => this.showSubCates(category)}>
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        ),
      },
    ];
  }
  setFields(newFields) {
    console.log(1,newFields);
  }
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    // 从状态中取数据
    const {
      categorys,
      subCategorys,
      parentId,
      parentName,
      loading,
      showStatus,
      form,
    } = this.state;
    // 从组件对象中数据
    const category = this.category || {};
    // Card 的左侧标题
    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>{" "}
          &nbsp;&nbsp; &nbsp;&nbsp;
          <span>{parentName}</span>
        </span>
      );
    // Card 的右侧button
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        添加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
          loading={loading}
          pagination={{
            pageSize: 5,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={() => this.setState({ showStatus: 0 })}
        >
          <AddForm
          categorys={this.state.categorys}
        
            parentId={this.state.parentId}
            fields={this.state.name}
            onChange={(newFields) => {
             console.log('new',newFields[0].value)
             this.setState({cate:newFields[0].value,cateName:newFields[1].value})
            }}
          />
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={() => {
            this.setState({ showStatus: 0 });
           // this.form.resetFields();
          }}

 
        >
          <UpdateForm
          //  categoryName={category.name}
            category={this._id}
            //setForm={(form) => (this.form = form)}         
            
            onChange={(newFields) => {
            console.log('new',newFields[0].value)
            this.setState({cate:category,cateName:newFields[0].value})
           }}
          />
        </Modal>
      </Card>
    );
  }
}
