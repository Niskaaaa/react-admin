import React, { Component } from "react";
import { Card,  Form, Input, Cascader, Button, message } from "antd";
import { StarOutlined, StarFilled, StarTwoTone,DoubleLeftOutlined } from '@ant-design/icons';
import LinkButton from "../../components/link-button";
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";
import { reqCategorys, reqAddOrUpdateProduct } from "../../api";
const { Item } = Form;
const { TextArea } = Input;
/*
商品添加/更新的路由组件
*/
class ProductAddUpdate extends Component {
  state = {
    options: [], // 用来显示级联列表的数组
  };
  constructor(props) {
    super(props);
    this.pw = React.createRef();
    this.editor = React.createRef();
  }
  /*
选择某个分类项时的回调
加载对应的二级分类显示
*/
  loadData = async (selectedOptions) => {
    // console.log('loadDate()', selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // 异步请求获取对应的二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value); // await 的作用: 保证完成执行完保存的分类数组才进入后面的语句;
    targetOption.loading = false; // 隐藏loading
    if (subCategorys && subCategorys.length > 0) {
      // 有子分类
      // 生成一个二级的options
      const cOptions = subCategorys.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      // 添加为对应的option 的children(子options)
      targetOption.children = cOptions;
    } else {
      // 没有子分类
      targetOption.isLeaf = true;
    }
    // 更新options 状态
    this.setState({
      options: [...this.state.options],
    });
  };
  /*
获取指定分类id 的子分类列表
如果parentId 为0 时获取一级列表
*/
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId);
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        // 根据一级分类数组初始化生成options 数组
        this.initOptions(categorys);
      } else {
        // 当前得到是二级分类列表
        // 返回二级分类列表(作为async 函数的promise 对象的成功的value 值)
        return categorys;
      }
    }
  };
  /*
生成级联的一级列表
*/
  initOptions = async (categorys) => {
    // 根据一级分类数组生成option 的数组
    const options = categorys.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }));
    // 如果当前是更新, 且商品是一个二级分类的商品
    const { product, isUpdate } = this;
    if (isUpdate && product.pCategoryId !== "0") {
      // 异步获取product.pCategoryId 的二级分类列表
      const subCategorys = await this.getCategorys(product.pCategoryId);
      if (subCategorys && subCategorys.length > 0) {
        // 生成二级的option 数组
        const cOptions = subCategorys.map((c) => ({
          value: c._id,
          label: c.name,
          isLeaf: true,
        }));
        // 找到对应的option
        const targetOption = options.find(
          (option) => option.value === product.pCategoryId
        );
        // 将cOptions 添加为对应的一级option 的children
        targetOption.children = cOptions;
      }
    }
    // 更新状态
    this.setState({
      options,
    });
  };

  validatePrice = (rule, value, callback) => {
    value = value * 1;
    if (value > 0) {
      callback();
    } else {
      callback("价格必须是大于0 的数值");
    }
  };
  // 添加/更新
   submit = async (values) => {
      console.log(values)
      
      const { name, desc, price, categoryIds } = values; 
      
      const imgs = this.pw.current.getImgs();
        const detail = this.editor.current.getDetail();        
        
        let pCategoryId = "";
        let categoryId = "";
        if (categoryIds.length === 1) {
          // 选择的是一级分类
          pCategoryId = "0";
          categoryId = categoryIds[0];
        } else {
          // 选择的是二级分类
          pCategoryId = categoryIds[0];
          categoryId = categoryIds[1];
        }
        // 封装成对象
        const product = {
          name,
          desc,
          price,
          pCategoryId,
          categoryId,
          detail,
          imgs,
        }; 
        
        if (this.isUpdate) {
          product._id = this.product._id;
        }
        
        const result = await reqAddOrUpdateProduct(product);
        if (result.status === 0) {
          message.success("保存商品成功");
          this.props.history.goBack();
        } else {
          message.success("保存商品失败");
        }
      
   // this.props.form.validateFields(async (err, values) => {
   /*   if (!err) {
        // 收集产品相关信息
        
        // 在父组件中得到子组件对象, 调用子组件对象的方法
       

        // 如果是更新, 指定product 的_id 属性值
       
        // 请求保存
        
    */
  };
  componentDidMount() {
    // 异步获取一级分类列表
    this.getCategorys("0");
  }
  componentWillMount() {
    // 取出跳转传入的数据
    const product = this.props.location.state;
    this.product = product || {};
    this.isUpdate = !!product; // !!xxx 将一个数据强制转换成布尔类型
  }
  render() {
    const { product, isUpdate } = this;
    const { pCategoryId, categoryId } = product;
    const { options } = this.state;
  //  const { getFieldDecorator } = this.props.form;
    // 准备用于级联列表显示的数组
    const categoryIds = [];
    if (isUpdate) {
      if (pCategoryId === "0") {
        categoryIds.push(categoryId);
      } else {
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
        <DoubleLeftOutlined />
        </LinkButton>
        {isUpdate ? "修改商品" : "添加商品"}
      </span>
    );
    // 指定form 的item 布局的对象
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };
    return (
      <Card title={title}>
        <Form onFinish={this.submit}>
          <Form.Item name="name" label="商品名称" {...formItemLayout}>
         <Input defaultValue={this.product.name}placeholer="请输入商品名称" />
          </Form.Item>
          <Form.Item name="desc"  label="商品描述" {...formItemLayout}>
           <TextArea defaultValue={this.product.desc} placeholder="请输入商品描述" autosize />
          </Form.Item>
          <Form.Item name="price" label="商品价格" {...formItemLayout}>
           
              <Input 
                type="number"
                placeholer="请输入商品价格"
                addonAfter="元"
                defaultValue={this.product.price}
              />
            
          </Form.Item>
          <Form.Item name="categoryIds"  label="商品分类" {...formItemLayout}>
           <Cascader options={options} defaultValue={this.product.categoryId} loadData={this.loadData} />
          </Form.Item>
          <Form.Item name="ppic" label="商品图片" {...formItemLayout}>
            <PicturesWall ref={this.pw} imgs={product.imgs} />
          </Form.Item>
          <Form.Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}name="pdetail"
          >
            <RichTextEditor  ref={this.editor} detail={product.detail} />
          </Form.Item>
          <Button type="primary"  htmlType="submit">
            提交
          </Button>
        </Form>
      </Card>
    );
  }
}
export default ProductAddUpdate;
