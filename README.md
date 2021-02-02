# 项目简介

react-admin是一个前后台分离的后台管理SPA项目

包括用户管理、商品分类管理、商品管理、权限管理等功能

前端使用react全家桶+antd4.0+axios+ES6+webpack等技术

后端方面采用python+flask+mongodb





# 项目日志

## 20210123

搭建脚手架

npm install -g create-react-app 
create-react-app react-admin

设计基本目录

### 引入antd

npm install antd

下载依赖模块 npm instal react-app-rewired customize-cra babel-plugin-import

配置cacro（主题配置）

https://ant.design/docs/react/use-with-create-react-app-cn#%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE

配置路由

<BrowserRouter>

搭建login界面

## 20210125

密码正则表达式的校验，以及末尾相应图标的显示

 ## 20210202

困扰了很久的问题，子组件是一个表单，但是提交按钮在父组件上，如何子组件向父组件传递参数。参考的是antd

表单数据存储于上层组件

https://ant.design/components/form-cn/#components-form-demo-global-state

通过onchange 调用父组件中的函数 随时存在state里

这个是一个钩子函数，fields是返回的状态，setFields是一个可以修改该状态的函数。在我的项目中并没有这样使用，而是存在state={ }中，然后另写一个set方法

```jsx
  const [fields, setFields] = useState([
    {
      name: ['username'],
      value: 'Ant Design',
    },
  ]);
```