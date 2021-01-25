import ajax from './ajax'
// 登陆
export const reqLogin = (username, password) => ajax('/login', {username, password},'POST')