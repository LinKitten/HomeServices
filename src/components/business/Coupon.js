
import React from 'react';
// 引入底部菜单
const Coupon = () => {
    //初始化
    let navigate = React.$Router.useNavigate()
    const { state } = React.$Router.useLocation();


    // 初始化活动详情数据
    const [info, SetInfo] = React.useState({});

    // 保存原来价格
    const [initialprice, SetInitialprice] = React.useState(0);
    // 默认没有预约活动
    const [isReser, SetIsReser] = React.useState(false);

    //获取cookie信息
    var cookie = React.$Cookies.load('business') ? React.$Cookies.load('business') : {}
    //设置状态数据
    var [business, SetBusiness] = React.useState(cookie)



    //可用优惠券列表
    const [coupons, setCoupons] = React.useState([])
    //不可用优惠券列表
    const [disabledCoupons, setDisabledCoupons] = React.useState([])
    // 当前选中优惠券的索引
    const [chosenCoupon, setChosenCoupon] = React.useState(-1)



    // 获取所有优惠券列表
    const CouponLoad = async (project) => {
        // 发送请求
        var result = await React.$HTTP.POST({
            url: "/coupon/receive/mycoupon",
            params: { busid: business.id }
        })
        if (result.code == 0) {
            React.$Vant.Toast.fail(result.msg)
            return false
        }
        // console.log(project);
        console.log(result.data);

        // 将数据组装优惠券组件需要的数据结构
        var usable = [];//可以使用的数据
        var unusable = [];//不可以使用的数据

        result.data.forEach((item, key) => {
            // // 计算折扣金额
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
                valueDesc: desc, //折扣
                unitDesc: '折'
            }
            // 分满足条件的优惠券，和不满足条件的优惠券
            if (item.status == "0") {
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


    // Hook钩子调用
    React.useEffect(() => {

        CouponLoad()// eslint-disable-next-line
    }, [])

    const onRefresh = () => {
        CouponLoad()
    }


    return (
        <>
            <link rel="stylesheet" href="/assets/css/info.css" type="text/css" />
            <React.$Vant.NavBar
                title="我的优惠券"
                onClickLeft={() => navigate(-1)}
            />
            <div className='mycoupon'>
                <React.$Vant.PullRefresh
                    onRefresh={() => onRefresh(true)}
                    onRefreshEnd={() => console.log('onRefreshEnd')}
                >
                    <React.$Vant.CouponList
                        chosenCoupon={chosenCoupon}
                        coupons={coupons}
                        disabledCoupons={disabledCoupons}
                        enabledTitle="未使用"
                        disabledTitle="已使用"
                        showCloseButton={false}
                        exchangeButtonDisabled={false}
                        showExchangeBar={false}

                    />
                </React.$Vant.PullRefresh>

            </div>



        </>
    )
}

export default Coupon