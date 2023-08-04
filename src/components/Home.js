import React from 'react';
// 引入底部菜单
import Menu from "@/components/Menu.js"
const Home = () => {

    // 标签栏数据
    const statuslist = [
        { name: "全部", value: "all" },
        { name: "未开始", value: "0" },
        { name: "开始报名", value: "1" },
        { name: "截止报名", value: "2" },
        { name: "已开始", value: "3" },
        { name: "已结束", value: "4" },
    ]

    // 初始活动状态
    const [active, SetActive] = React.useState("all");

    // 初始加载状态未关闭
    const [finished, SetFinished] = React.useState(false);
    // 初始化页码
    const [page, SetPage] = React.useState(1);
    // 初始化活动数据列表
    const [list, SetList] = React.useState([]);

    // 标签切换触发的方法
    const TabChange = (index) => {
        // 覆盖活动的状态
        SetActive(statuslist[index]['value']);
        // 加载数据
        onRefresh();
    }
    // 加载数据
    const ProjectLoad = async () => {
        // 组装数据 
        var data = {
            status: active,
            page: page
        }
        // 发送请求
        var result = await React.$HTTP.POST({
            url: "/project/project/index",
            params: data
        });

        if (result.code == 0) {
            // 设置加载完成
            SetFinished(true)
            // React.$Vant.Toast.fail(result.msg)
            return false
        }


        // 页面加一
        SetPage(page + 1);

        // 追加数据
        SetList(list.concat(result.data));
        // 当数据少于规定数组的时候，停止加载
        if (result.data.length < 8) {
            SetFinished(true);
            return false;
        }
    }

    // 下拉加载
    const onRefresh = () => {
        // 加载状态
        SetFinished(false);
        SetPage(1);
        SetList([]);
    }
    // 空状态
    const Emptycon = () => {
        if (list.length <= 0) {
            return (
                <React.$Vant.Empty description="没有更多数据哦~" />
            )
        }
    }
    return (
        <>
            <link rel="stylesheet" href="/assets/css/index.css" type="text/css" />
            <React.$Vant.NavBar
                title="活动预约"
                leftArrow={false}

            />

            {/* banner */}
            <div className="banner_box swiper-container">
                <div id="banner" className="swiper-wrapper" >
                    <React.$Router.NavLink to={"/coupon"} className="swiper-slide">
                        <img src="/assets/images/banner.png" />
                    </React.$Router.NavLink>
                </div>
                <div className="swiper-pagination"></div>
            </div>

            {/* 标签栏 */}
            <React.$Vant.Tabs onChange={TabChange} >
                {statuslist.map(item => (
                    <React.$Vant.Tabs.TabPane key={item.value} title={item.name}></React.$Vant.Tabs.TabPane>
                ))}
            </React.$Vant.Tabs>

            {/* 活动列表 */}
            <div className="project">
                {/*  列表上拉加载+下拉刷新 */}
                <React.$Vant.PullRefresh onRefresh={onRefresh}>
                    <React.$Vant.List finished={finished} onLoad={ProjectLoad}>
                        {list.map((item, key) => (
                            <React.$Router.NavLink to="/project/info" state={{ id: item.id }} className="item" key={key}>
                                <React.$Vant.Card round>
                                    <React.$Vant.Card.Header>{item.title}</React.$Vant.Card.Header>
                                    <React.$Vant.Card.Body>

                                        <React.$Vant.Space direction="vertical">
                                            <div className='cardimg'>
                                                <img src={item.thumb_text} />
                                            </div>
                                            <React.$Vant.Flex justify='center' align='center'>
                                                <React.$Vant.Flex.Item span={8} >已有 {item.count_text} 人参与</React.$Vant.Flex.Item>
                                                <React.$Vant.Flex.Item span={4}></React.$Vant.Flex.Item>
                                                <React.$Vant.Flex.Item span={12}>活动参与人数：{item.nums == 0 ? '不限' : item.nums}人数</React.$Vant.Flex.Item>
                                            </React.$Vant.Flex>

                                        </React.$Vant.Space>


                                    </React.$Vant.Card.Body>
                                    <React.$Vant.Card.Footer>

                                        <React.$Vant.Flex justify='center' align='center'>
                                            <React.$Vant.Flex.Item span={8} className="proprice">￥{item.price}</React.$Vant.Flex.Item>
                                            <React.$Vant.Flex.Item span={8}></React.$Vant.Flex.Item>
                                            <React.$Vant.Flex.Item span={8}>
                                                <React.$Vant.Button round size='small' plain  type='primary'>
                                                    {item.status_text}
                                                </React.$Vant.Button>
                                            </React.$Vant.Flex.Item>
                                        </React.$Vant.Flex>
                                    </React.$Vant.Card.Footer>
                                </React.$Vant.Card>


                            </React.$Router.NavLink>

                        ))}
                        {/* 空数据 */}
                        <Emptycon />
                    </React.$Vant.List>
                </React.$Vant.PullRefresh>


            </div >

            {/* 底部菜单 */}
            < Menu />
        </>
    )
}

export default Home