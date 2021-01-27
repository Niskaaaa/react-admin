import React from "react";
import {Redirect} from 'react-router-dom'
import memeoryUtils from '../../utils/memoryUtils'

class Admin extends React.Component {
  render() {
    const user = memeoryUtils.user;
    if (!user) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <h2>后台管理</h2>
        <div>Hello {user.username}</div>
      </div>
    );
  }
}

export default Admin;
