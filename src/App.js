import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import { Button,message } from 'antd'
import {BrowserRouter,Route, Switch} from'react-router-dom'
import Login from'./pages/login/login'
import Admin from'./pages/admin/admin'
export default class App extends Component{

  alert=()=>{
    message.success('success')
  }
  render(){
    return (
      <BrowserRouter>
      <Switch>{/*只匹配其中一个 */}
      <Route path='/login' component={Login}>

      </Route>
      <Route path='/' component={Admin}>

      </Route>
</Switch>
      </BrowserRouter>
    )
  }
};
