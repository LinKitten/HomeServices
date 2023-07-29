import React from 'react';
// 引入底部菜单
import Menu from "@/components/Menu.js"

const Order = () => {
  
    return (
        <>
            <link rel="stylesheet" href="/assets/css/order.css" type="text/css" />
            <header className="am-header">
                <div className="am-header-left am-header-nav">
                    <a  onClick={()=> window.history.back(-1)}>
                        <i className="am-icon-chevron-left"></i>
                    </a>
                </div>
                <h1 className="am-header-title">订单</h1>
            </header>

            {/* <!--订单状态--> */}
            <div className="state_box">
                <div className="state">进行中</div>
                <div className="state">已完成</div>
                <div className="blue_block"></div>
            </div>

            {/* <!--订单信息--> */}
            <div className="move_box">
                <div className="move">
                    <div className="order_box">
                        <div className="order" >
                            <div className="border_top"></div>
                            <div className="order_title">日常保洁</div>
                            <div className="order_text">
                                <div className="border_top"></div>
                                <h1>2016-1-4&nbsp;&nbsp;&nbsp;&nbsp;09:30-12:00</h1>
                                <h2>开发区xx小区1号楼1单元101室</h2>
                                <p>￥180</p>
                                <div className="border_bottom"></div>
                            </div>

                            <div className="cancel">未付款</div>
                            <div className="border_bottom"></div>
                        </div>
                        <div className="order" >
                            <div className="border_top"></div>
                            <div className="order_title">日常保洁</div>
                            <div className="order_text">
                                <div className="border_top"></div>
                                <h1>2016-1-4&nbsp;&nbsp;&nbsp;&nbsp;09:30-12:00</h1>
                                <h2>开发区xx小区1号楼1单元101室</h2>
                                <p>￥180</p>
                                <div className="border_bottom"></div>
                            </div>
                            <div className="cancel">取消订单</div>
                            <div className="border_bottom"></div>
                        </div>
                    </div>
                </div>
            </div>


            <Menu />
        </>
    )
}

export default Order