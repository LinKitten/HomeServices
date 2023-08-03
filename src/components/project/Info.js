
import React from 'react';
// 引入底部菜单
const Info = () => {
    //初始化
    let navigate = React.$Router.useNavigate()
    const { state } = React.$Router.useLocation();
    // console.log(state);

    // 接送传递的活动id
    const [id, SetId] = React.useState(state.id);
    // 初始化活动详情数据
    const [info, SetInfo] = React.useState({});

    // 保存原来价格
    const [initialprice, SetInitialprice] = React.useState(0);

    //获取cookie信息
    var cookie = React.$Cookies.load('business') ? React.$Cookies.load('business') : {}
    //设置状态数据
    var [business, SetBusiness] = React.useState(cookie)

    // 初始化倒计时时间
    const [down, SetDown] = React.useState(0)
    // 初始化提示信息
    const [msg, SetMsg] = React.useState('')

    //可用优惠券列表
    const [coupons, setCoupons] = React.useState([])
    //不可用优惠券列表
    const [disabledCoupons, setDisabledCoupons] = React.useState([])
    // 当前选中优惠券的索引
    const [chosenCoupon, setChosenCoupon] = React.useState(-1)
    // 弹框状态
    const [visible, setVisible] = React.useState(false)


    // 优惠券切换回调
    const onChange = (index) => {
        // 关闭优惠券弹窗
        setVisible(false);
        // 设置选中的优惠券
        setChosenCoupon(index);
        // 修改活动的支付金额

        var tmpPrice = coupons[index] ? coupons[index].value : 0;
        tmpPrice = tmpPrice / 100;

        var price = parseFloat(initialprice) - parseFloat(tmpPrice); //减掉折扣金额
        info.price = price.toFixed(2);
        SetInfo(info);
    }


    // 获取活动数据
    const InfoLoad = async () => {
        var result = await React.$HTTP.POST({
            url: '/project/project/info',
            params: { id: id }
        })

        if (result.code == 0) {
            React.$Vant.Toast.fail({
                message: "没有活动数据",
                onClose: () => {
                    navigate(-1)
                }
            })
            return false
        }

        //   '赋值
        SetInfo(result.data)
        SetInitialprice(result.data.price);

        // 计算到时间数值
        //活动还没开始
        if (result.data.status < '3') {
            // 获取活动开始时间
            var createtime = result.data.createtime * 1000
            var now = new Date().getTime()
            var res = createtime - now <= 0 ? 0 : createtime - now
            SetDown(res)
            SetMsg('距离活动开始还剩')
        } else {
            //活动已开始，未结束
            // 获取活动结束时间
            var endtime = result.data.endtime * 1000
            var time = new Date().getTime()
            var dom = endtime - time <= 0 ? 0 : endtime - time;
            SetDown(dom)
            SetMsg('距离活动结束还剩')
        }

        // 在有登录的情况下区获取优惠券数据
        if (Object.getOwnPropertyNames(business).length > 0) {
            // 传递活动的数据
            CouponLoad(result.data);
        }


    }

    // 根据活动状态展示不同的倒计时内容
    const CountDown = () => {
        if (down > 0) {
            return (
                <div className="down">
                    <div className="left">{msg}</div>

                    <React.$Vant.CountDown time={down} millisecond format="HH:mm:ss:SS">
                        {(timeData) => (
                            <>
                                <div className="time">
                                    <span className="day">{timeData.days}</span>天
                                    <span className="hour">{timeData.hours}</span>时
                                    <span className="min">{timeData.minutes}</span>分
                                    <span className="sec">{timeData.seconds}</span>秒
                                </div>

                            </>
                        )}
                    </React.$Vant.CountDown>
                </div>
            )
        } else {
            return (<></>)
        }

    }

    // 获取所有优惠券列表
    const CouponLoad = async (project) => {
        // 发送请求
        var result = await React.$HTTP.POST({
            url: "/coupon/receive/index",
            params: { busid: business.id }
        })
        if (result.code == 0) {
            React.$Vant.Toast.fail(result.msg)
            return false
        }
        console.log(project);
        console.log(result.data);

        // 将数据组装优惠券组件需要的数据结构
        var usable = [];//可以使用的数据
        var unusable = [];//不可以使用的数据

        result.data.forEach((item,key) => {
            // 计算折扣金额
            var update = parseFloat(project.price) * parseFloat(item.coupon.discount)
            update = parseFloat((project.price - update) * 100);

            // 计算折扣数值
            var desc = parseFloat(item.coupon.discount) * 10
            desc = desc.toFixed(1);

            var tmp = {
                id: item.id.toString(),
                name: item.coupon.title,
                condition: ` `,//满减条件
                startAt: item.coupon.createtime,
                endAt: item.coupon.endtime,
                description: `使用门槛，满 ￥${item.coupon.requirement}元 可以使用`,
                value: update, //折扣金额
                valueDesc: desc, //折扣
                unitDesc: '折'
            }
            // 分满足条件的优惠券，和不满足条件的优惠券
            if (parseFloat(project.price) >= parseFloat(item.coupon.requirement)) {
                usable.push(tmp);
            } else {
                // 追加不可用字段
                tmp.reason = tmp.description;
                unusable.push(tmp)
            }
        })

        // 覆盖数据
        setCoupons(usable);
        setDisabledCoupons(unusable);


    }

    // 立即预约
    const submit = () => {
        // 需要用户登录
        if (Object.getOwnPropertyNames(business).length <= 0) {
            React.$Vant.Toast.fail('请先登录')
            return false
        }

        // 弹出确认框
        React.$Vant.Dialog.confirm({
            title: '预约提醒',
            message: '是否确认预约该活动'
        }).then(async () => {

            // 发送请求

            // 获取被选中的优惠券的id
            var cid = coupons[chosenCoupon] ? coupons[chosenCoupon].id : 0;

            //组装数据
            var data = {
                pid: info.id,
                busid: business.id,
                cid: cid
            }

            var result = await React.$HTTP.POST({
                url: "/project/order/add",
                params: data
            })

            console.log(result.data);
            if (result.code == 0) {
                React.$Vant.Toast.fail(result.msg)
                return false
            }

            React.$Vant.Toast.success({
                message: result.msg,
                onClose: () => {
                    navigate(result.url)
                }
            })

            // 这里最好重新设置一下cookie

        })
            .catch(() => {

            })

    }
    // Hook钩子调用

    React.useEffect(() => {

        InfoLoad()// eslint-disable-next-line
    }, [])

    // 根据活动状态显示不同的按钮
    const Appointment = () => {
        if (info.status == "0") {
            return (
                <div className="am-navbar gm-foot am-no-layout footer">
                    <a className="button dis ">活动还未开始报名</a>
                </div>
            )
        }
        if (info.status == "1") {
            return (

                <div className="am-navbar gm-foot am-no-layout footer">
                    <React.$Vant.CouponCell
                        coupons={coupons}
                        chosenCoupon={chosenCoupon}
                        onClick={() => setVisible(true)}
                    />
                    <React.$Vant.Popup
                        round
                        position='bottom'
                        style={{ height: '90%', paddingTop: 4 }}
                        visible={visible}
                        onClose={() => setVisible(false)}
                    >
                        <React.$Vant.CouponList
                            chosenCoupon={chosenCoupon}
                            coupons={coupons}
                            disabledCoupons={disabledCoupons}
                            onChange={onChange}
                        />
                    </React.$Vant.Popup>
                    <a className="button" onClick={submit} >立即预约</a>
                </div>
            )
        }
        if (info.status == "2" || info.status == "3") {
            return (
                <div className="am-navbar gm-foot am-no-layout footer">

                    <a className="button dis">活动已截止报名</a>
                </div>
            )
        }

        if (info.status == "4") {
            return (
                <div className="am-navbar gm-foot am-no-layout footer">
                    <a className="button dis"> 活动已结束</a>
                </div>
            )
        }
    }


    return (
        <>
            <link rel="stylesheet" href="/assets/css/info.css" type="text/css" />
            <React.$Vant.NavBar
                title="活动详情"
                onClickLeft={() => navigate(-1)}
            />

            {/* banner */}
            <div className="banner_box swiper-container">
                <div id="banner" className="swiper-wrapper">
                    <div className="swiper-slide"><img src={info.thumb_text} /></div>
                </div>
                <div className="swiper-pagination"></div>
            </div>

            {/* <!-- 基本信息 --> */}
            <div className="info">
                <h3 className="title">{info.title} </h3>
                <div className="base">
                    <div className="price">￥ {info.price} <sub className='sub'>￥{initialprice} </sub></div>
                    <div className="join">
                        <span>浏览：1199</span>
                        <span>已预约：{info.count_text}人</span>镰刀
                        <span>分享</span>
                    </div>
                </div>
            </div>

            {/* <!-- 倒计时 --> */}
            <CountDown />

            {/* <!-- 选项信息 --> */}
            <div className="option">
                <div className="title">活动时间</div>
                <div className="desc">
                    {info.createtime_text} - {info.endtime_text}
                </div>
            </div>

            {/* <!-- 详细信息 --> */}
            <div className="detail">
                <div className="title">
                    <div className="line left"></div>
                    <div className="center">详情</div>
                    <div className="line right"></div>
                </div>
                <div className="content" dangerouslySetInnerHTML={{ __html: info.content }}>
                </div>
            </div>

            <div className="am-navbar gm-foot am-no-layout footer">
                <React.$Vant.CouponCell
                    coupons={coupons}
                    chosenCoupon={chosenCoupon}
                    onClick={() => setVisible(true)}
                />
                <React.$Vant.Popup
                    round
                    position='bottom'
                    style={{ height: '90%', paddingTop: 4 }}
                    visible={visible}
                    onClose={() => setVisible(false)}
                >
                    <React.$Vant.CouponList
                        chosenCoupon={chosenCoupon}
                        coupons={coupons}
                        disabledCoupons={disabledCoupons}
                        onChange={onChange}
                    />
                </React.$Vant.Popup>
            </div>
            {/* 按钮 */}
            <Appointment />
        </>
    )
}

export default Info