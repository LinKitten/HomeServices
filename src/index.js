import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 全局引入react-router-dom
import * as Router from "react-router-dom"
import * as Vant from 'react-vant'
import * as ICONS from '@react-vant/icons';
import cookies from 'react-cookies'
//引入接口请求
import request from '@/services/request.js'

//追加到全局框架上
React.$Router = Router
//将UI框架自定义属性挂载到全局上 我们自己加的步骤，官网没有这个操作
React.$Vant = Vant
React.$ICONS = ICONS
React.$Cookies = cookies
React.$HTTP = request

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
