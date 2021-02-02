import React, { Component } from "react";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";
import LinkButton from "../link-button";
import menuList from "../../config/menuConfig";
import { reqWeather } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import "./index.less";
/*
头部组件
*/
class Header extends Component {
  state = {
    sysTime: formateDate(Date.now()),
    dayPictureUrl: "", // 天气图片的url
    weather: "",
  };
  /*
发异步ajax 获取天气数据并更新状态
*/

  getSysTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        sysTime: formateDate(Date.now()),
      });
    }, 1000);
  };

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname;
    let title;
    console.log(menuList)
    Array.from(menuList).forEach((item) => {
      if (item.key === path) {
        // 如果当前item 对象的key 与path 一样,item 的title 就是需要

        title = item.title;
      } else if (item.children) {
        // 在所有子item 中查找匹配的
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        );
        // 如果有值才说明有匹配的
        if (cItem) {
          // 取出它的title
          title = cItem.title;
        }
      }
    });
    return title;
  };
  /*
      退出登陆
      */
  logout = () => {
    Modal.confirm({
      content: "确定退出吗?",
      onOk: () => {
        console.log("OK");
        // 移除保存的user
        storageUtils.removeUser();
        memoryUtils.user = {};
        // 跳转到login
        this.props.history.replace("/login");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  /*
      根据请求的path 得到对应的标题
      */

  componentDidMount() {
    this.getSysTime();

  }
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId);
  }
  render() {
    const { sysTime, dayPictureUrl, weather } = this.state;
    // 得到当前用户
    const user = memoryUtils.user;
    // 得到当前请求的路径
    const path = this.props.location.pathname;
    // 得到对应的标题
    const title = this.getTitle(path);

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {user.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{sysTime}</span>
  
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
