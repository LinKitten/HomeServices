import React from 'react';

const Login = () => {
    // 实例化 
    let navigate = React.$Router.useNavigate();


    const rules = {
        mobile: [
            {
                required: true,
                message: '请输入手机号码',
            },
            {
                pattern: /(^1[3|4|5|7|8][0-9]{9}$)/,
                message: '手机号码格式有误'
            }
        ],
        password: [
            {
                required: true,
                message: '请输入密码',
            },
            {
                pattern: /.{6,}/,
                message: '密码只要6位以上'
            }
        ]
    }


    // 确定注册事件
    let register = async value => {
        // console.log(value);

        // 组装数据
        var data = {
            mobile: value.mobile,
            password: value.password,
            action: "react"
        }

        // 发送请求

        var result = await React.$HTTP.POST({
            url: '/business/login',
            params: data
        })

        if(result.code ==0 ){
            React.$Vant.Toast.fail(result.msg)
            return false
        }

        // 请求成功
        React.$Vant.Toast.success({
            message:result.msg,
            onClose:()=>{
                //保存用户信息到cookie
                React.$Cookies.save("business",result.data,{path: '/'})
                // 跳转到我的页面bsiness/index
                navigate(result.url)
            }

        })

    }
    return (
        <>
            <React.$Vant.NavBar
                title="登录"
                onClickLeft={() => navigate(-1)}
            />
            <div className="logo"><img src="/assets/images/logo.png" /></div>

            {/* 表单 */}

            <React.$Vant.Form
                onFinish={register}
                footer={
                    <div style={{ margin: '16px 16px 0' }}>
                        <React.$Vant.Button round nativeType='submit' type='primary' block>
                            登录
                        </React.$Vant.Button>
                    </div>
                }>

                {/* 手机号 */}
                <React.$Vant.Form.Item
                    name="mobile"
                    label="手机号码"
                    rules={rules.mobile}
                >
                    <React.$Vant.Input placeholder='请输入用户名' />
                </React.$Vant.Form.Item>
                {/* 密码 */}
                <React.$Vant.Form.Item
                    name="password"
                    label="密码"
                    rules={rules.password}
                >
                    <React.$Vant.Input type="password" placeholder='请输入密码' />
                </React.$Vant.Form.Item>

            </React.$Vant.Form>
            <p className="login-text">没有账户，立即<React.$Router.Link to='/register' className="reg">注册</React.$Router.Link></p>

        </>
    )
}

export default Login