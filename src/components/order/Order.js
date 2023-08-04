import React from 'react';
// 引入底部菜单
import Menu from "@/components/Menu.js"

const Order = () => {

    // 初始化navigate
    let navigate = React.$Router.useNavigate();
    // 标签栏数据
    const statuslist = [
        { name: "全部", value: "all" },
        { name: "未开始", value: "0" },
        { name: "已开始", value: "1" },
        { name: "已结束", value: "2" },
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
            url: "/project/order/index",
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
    // 前往评价界面
    const goComment = (id) => {

    }

    const stausButton = (item) => {
        if (item.status == "0") {
            return (
                <React.$Vant.Space >
                    <React.$Vant.Button type="default" round block size="small">
                        取消预约
                    </React.$Vant.Button>
                </React.$Vant.Space>
            )
        }
        if (item.status == "2" && item.comment <= 0) {
            return (
                <React.$Vant.Space >
                    <React.$Router.NavLink to="/business/comment" state={{ id: item.id }} >
                        <React.$Vant.Button type="info" round block size="small">

                            请评价

                        </React.$Vant.Button>
                    </React.$Router.NavLink>
                </React.$Vant.Space>
            )
        }
        if (item.status == "2" && item.comment.length > 0) {
            return (
                <React.$Vant.Space >
                    <React.$Vant.Button type="info" disabled round block plain size="small">
                        已评价
                    </React.$Vant.Button>
                </React.$Vant.Space>
            )
        }

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
            <link rel="stylesheet" href="/assets/css/order.css" type="text/css" />
            <React.$Vant.NavBar
                title="我参与的活动"
                onClickLeft={() => navigate(-1)}
            />

            {/* <!--订单状态--> */}
            <React.$Vant.Tabs onChange={TabChange}>
                {statuslist.map(item => (
                    <React.$Vant.Tabs.TabPane key={item.value} title={item.name} >
                    </React.$Vant.Tabs.TabPane>
                ))}
            </React.$Vant.Tabs>

            {/* <!--订单信息--> */}
            <div className="project">
                <a className="item">

                    <React.$Vant.PullRefresh onRefresh={onRefresh}>
                        <React.$Vant.List finished={finished} onLoad={ProjectLoad}>
                            {list.map((item, key) => (

                                <React.$Vant.Card key={key} round style={{
                                    marginBottom: "10px",
                                }}>

                                    <React.$Vant.Card.Header border>
                                        <React.$Router.NavLink to="/project/info" state={{ id: item.id }} >
                                            {item.project.title}
                                        </React.$Router.NavLink>
                                    </React.$Vant.Card.Header>

                                    <React.$Vant.Card.Body
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div className="thumb">
                                            <img src={item.project.thumb_text} />
                                        </div>
                                        <div className="info">
                                            <div className="taglist">
                                            </div>
                                            <div className="limit">
                                                <div >实际支付：<span className="price">￥{item.total}</span></div>
                                                {/* <div className="max"></div> */}
                                                <div className="tag max">{item.status_text}</div>

                                            </div>
                                            <div className="time">活动时间:{item.project.createtime_text}</div>
                                        </div>
                                    </React.$Vant.Card.Body>
                                    <React.$Vant.Card.Footer border
                                        style={{
                                            marginTop: "0px",
                                        }}>
                                        {/* <React.$Vant.Space >
                                        <React.$Vant.Button type="primary" round block size="small">
                                            查看更多
                                        </React.$Vant.Button>
                                        </React.$Vant.Space> */}

                                        {/* 根据活动的状态展示不同的按钮 */}
                                        {stausButton(item)}

                                    </React.$Vant.Card.Footer>
                                </React.$Vant.Card>


                            ))}
                            {/* 空数据 */}
                            <Emptycon />
                        </React.$Vant.List>
                    </React.$Vant.PullRefresh>
                </a>
            </div>
            <Menu />
        </>
    )
}

export default Order