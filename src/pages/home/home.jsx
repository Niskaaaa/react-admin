import React, { Component } from "react";
import { Redirect,Route,Switch} from "react-router-dom";
import { Layout } from "antd";
import memeoryUtils from "../../utils/memoryUtils";
import Header from "../../components/header";
import LeftNav from "../../components/left-nav";

import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import './home.less'
/*
后台管理的路由组件
*/
const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const user = memeoryUtils.user;
    console.log(user);
    if (!user) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home">
      欢迎使用硅谷后台管理系统
      </div>
      )
  }
}
