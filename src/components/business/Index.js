import React from 'react';
// 引入底部菜单
import Menu from "@/components/Menu.js"
import { NavLink } from 'react-router-dom'

const Index = () => {
    // 初始化navigate
    let navigate = React.$Router.useNavigate();
    // 获取cookie上的用户信息
    var cookie = React.$Cookies.load("business") ? React.$Cookies.load("business") : {}

    // 设置状态数据
    var [business, SetBusiness] = React.useState(cookie)

    // 退出登录
    let logout = () => {
        // 提示框
        React.$Vant.Dialog.confirm({
            title: '退出登录',
            message: '是否确定退出登录？',
        }).then(() => {
            // 删除cookie
            React.$Cookies.remove('business', { path: '/' });
            // 跳转到登录页面
            navigate("/login")
        }).catch(() => { })
    }

    return (
        <>
            <React.$Vant.NavBar
                title="个人中心"
                leftArrow={false}
            />

            <div className="wo">
                <img src={business.avatar_text} />
                <p><NavLink to="/business/profile">{business.nickname} <i className="am-icon-angle-right"></i></NavLink></p>
            </div>

            <ul className="member">
                <li>
                    <a>
                        <h2>{business.money}</h2>
                        <p>余额</p>
                    </a>
                </li>
                <li>
                    <a>
                        <h2>50</h2>
                        <p>订单</p>
                    </a>
                </li>
                <li>
                    <a>
                        <h2>2</h2>
                        <p>优惠券</p>
                    </a>
                </li>
            </ul>
            <ul className="nav">
                <li>
                    <NavLink to="/business/profile">
                        <span>个人资料</span>
                        <i className="am-icon-angle-right"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/order/order">
                        <span>我的订单</span>
                        <i className="am-icon-angle-right"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <span>我的地址</span>
                        <i className="am-icon-angle-right"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        <span>优惠券</span>
                        <i className="am-icon-angle-right"></i>
                    </NavLink>
                </li>
                <li>
                    <a href="tel:123456">
                        <span>在线客服</span>
                        <i className="am-icon-angle-right"></i>
                    </a>
                </li>
                <li>
                    <NavLink to="/">
                        <span>邀请分享</span>
                        <i className="am-icon-angle-right"></i>
                    </NavLink>
                </li>
                <li>
                    <a onClick={logout}>
                        <span>退出登录</span>
                        <i className="am-icon-angle-right"></i>
                    </a>
                </li>
            </ul>

            <Menu />
        </>
    )
}

export default Index