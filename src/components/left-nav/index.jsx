import React, { Component } from "react";
import "./index.less";
import { Menu, Switch,icon } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import menuConfig from "../../config/menuConfig"
const { SubMenu } = Menu;

/*
左侧导航组件
*/
export default class LeftNav extends Component {
  state = {
    theme: "dark",
    current: "1",
  };
getMenuNodes = (menuList) => {
  // 得到当前请求的path
  const path = this.props.location.pathname;
  return menuList.reduce((pre, item) => {
    if (!item.children) {
      pre.push(
        <Menu.Item key={item.key}>
          <Link to={item.key} icon={item.icon} title={item.title}>

          </Link>
        </Menu.Item>
      );
    } else {
      pre.push(
        <SubMenu
          key={item.key}
          title={
            <span>
              <icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes(item.children)}
        </SubMenu>
      );
      // 如果当前请求路由与当前菜单的某个子菜单的key 匹配, 将菜单的key 保存为openKey
      if (item.children.find((cItem) => path.indexOf(cItem.key) === 0)) {
        this.openKey = item.key;
      }
    }
    return pre;
  }, []);
};
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };

  render() {

    return (
      <div className="left-nav">
        <Link to="/home" className="logo-link">
          <h1>后台管理系统</h1>
        </Link>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[this.state.current]}
          mode="inline"
        >

<Menu.Item key="/home" icon={<HomeOutlined />}>首页</Menu.Item>

<Menu.Item key="/home" icon={<HomeOutlined />}>首页</Menu.Item>
<Menu.Item key="/home" icon={<HomeOutlined />}>首页</Menu.Item>
          <SubMenu key="/products" icon={<MailOutlined />} title="商品">
            <Menu.Item key="/category">品类管理</Menu.Item>
            <Menu.Item key="/product">商品管理</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            icon={<SettingOutlined />}
            title="Navigation Three"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
