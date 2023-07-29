import React from 'react';

const Menu = () => {

    
    // 初始路由跳转
    let navigate = React.$Router.useNavigate()
    let location = React.$Router.useLocation()
    const [active,SetActive] = React.useState(location.pathname)

    let MenuToggle = (name)=>{
        SetActive(name); //切换选中的标签
        navigate(name);  //路由跳转
    }

    return (
        <>
            <React.$Vant.Tabbar  value={active} defaultValue={active} onChange={MenuToggle}>
                <React.$Vant.Tabbar.Item name="/" icon={<React.$ICONS.WapHomeO />}>首页</React.$Vant.Tabbar.Item>
                <React.$Vant.Tabbar.Item name="/order/order" icon={<React.$ICONS.OrdersO />}>订单</React.$Vant.Tabbar.Item>
                <React.$Vant.Tabbar.Item name="/business/index" icon={<React.$ICONS.FriendsO />}>我的</React.$Vant.Tabbar.Item>
            </React.$Vant.Tabbar> 

        </>
    )
}

export default Menu