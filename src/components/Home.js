import React from 'react';
// 引入底部菜单
import Menu from "@/components/Menu.js"
const Home = () => {
    return (
        <>
            <link rel="stylesheet" href="/assets/css/index.css" type="text/css" />
            <header className="am-header">
                <h1 className="am-header-title">活动报名</h1>
            </header>

            <div className="banner_box swiper-container">
                <div id="banner" className="swiper-wrapper">
                    <div className="swiper-slide"><img src="/assets/images/banner.png" /></div>
                    <div className="swiper-slide"><img src="/assets/images/banner.png" /></div>
                    <div className="swiper-slide"><img src="/assets/images/banner.png" /></div>
                </div>
                <div className="swiper-pagination"></div>
            </div>

            <div className="project">
                <React.$Router.NavLink  to="/info" className="item">
                    <div className="thumb">
                        <img src="/assets/images/thumb.jpg" />
                    </div>
                    <div className="info">
                        <div className="title">房屋装修预约</div>
                        <div className="taglist">
                            <div className="tag">进行中</div>
                            <div className="tag">已有 29 人参与</div>
                        </div>
                        <div className="limit">
                            <div className="price">￥1.00</div>
                            <div className="max">不限人数</div>
                        </div>
                        <div className="time">2023-07-26 11:23:11</div>
                    </div>
                </React.$Router.NavLink>
            
            </div>

            {/* 底部菜单 */}
            <Menu />
        </>
    )
}

export default Home