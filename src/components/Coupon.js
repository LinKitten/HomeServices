import React from "react";


const Coupon = () => {

    //初始化
    let navigate = React.$Router.useNavigate();

    //获取cookie信息
    var cookie = React.$Cookies.load('business') ? React.$Cookies.load('business') : {}
    //设置状态数据
    var [business, SetBusiness] = React.useState(cookie)


    // 用来存储优惠券列表数据
    const [list, SetList] = React.useState([]);

    // 获取优惠券列表
    const CouponData = async () => {
        // 发送请求
        var result = await React.$HTTP.POST({
            url: "/coupon/coupon/index",
            params: {
                busid: business.id
            }
        })

        if (result.code == 0) {
            React.$Vant.Toast.fail(result.msg)
            return false
        }
        console.log(result.data);

        // 赋值
        SetList(result.data)
    }

    // 领取优惠券
    const CouponReceive = async (cid) => {
        // console.log(cid);

        React.$Vant.Dialog.confirm({
            title: "领取提醒",
            message: "是否确认领取该优惠券"
        }).then(() => {
            // 组装数据
            var data = {
                busid: business.id,
                cid: cid
            }

            // 发送请求
            var result = React.$HTTP.POST({
                url: "/coupon/receive/add",
                params: data
            })

            console.log(result.data);
            if (result.code == 0) {
                React.$Vant.Toast.fail(result.msg)
                return false
            }

            React.$Vant.Toast.success({
                message: result.msg,
                duration: 2000,
                forbidClick: true,
                onClose: () => {
                    //重新请求优惠券数据
                    CouponData()
                }
            })
        }).catch(() => { })
    }

    React.useEffect(() => {
        CouponData();// eslint-disable-next-line
    }, [])

    // 显示不同按钮组件
    const ReceiveButton = (item) => {
        if (item.count_text < item.nums) {
            return (
                item.receive ?
                    <React.$Vant.Button disabled round size="small" className="btn" type='warning'>已领取</React.$Vant.Button> :
                    <React.$Vant.Button round
                        color='linear-gradient(to right, #ff6034, #ee0a24)'
                        size='small' className="btn"
                        onClick={() => { CouponReceive(item.id) }}>
                        领取</React.$Vant.Button>
            )
        } else {
            return (
                <React.$Vant.Button disabled round size="small" className="btn" color="#827e7e">已领完</React.$Vant.Button>
            )
        }
    }
    // 优惠券组件
    const CouponList = () => {

        return list.map((item, key) => {
            return (
                <div className="coupon" key={key}>
                    <div className="coupon_title">{item.title}</div>
                    <div className="coupon_text">
                        <h2>{item.content}</h2>
                        <p>{(item.discount * 10).toFixed(1)}折</p>
                        <div>{item.createtime_text}&nbsp;&nbsp;~&nbsp;&nbsp;{item.endtime_text}</div>
                    </div>
                    <div className="coupon_if">使用条件：{item.requirement <= 0 ? '无门槛' : `订单金额超过 ￥ ${item.requirement}`}</div>
                    {/* <div className="cancel">未付款</div> */}

                    {ReceiveButton(item)}
                    <div className="border_bottom"></div>
                </div>
            )
        })
    }


    return (
        <>
            <link rel="stylesheet" href="/assets/css/order.css" type="text/css" />

            <React.$Vant.NavBar
                title="优惠券"
                onClickLeft={() => navigate(-1)}
            />
            <div className="move_box">
                <div className="move">
                    <div className="order_box">
                        <CouponList />
                    </div>
                </div>
            </div>


        </>

    )
}

export default Coupon