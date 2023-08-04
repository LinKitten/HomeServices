import React from 'react'

class AuthRouter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }




    render() {
        // 获取cookie上的用户信息
        var cookie = React.$Cookies.load("business") ? React.$Cookies.load("business") : {}
        const AuthLogin = () => {
            // 实例化 
            var navigate = React.$Router.useNavigate();


            if (Object.getOwnPropertyNames(cookie).length <= 0) {
                React.$Vant.Toast.fail({
                    message: "请先登录",
                    onClose: () => {
                        navigate("/login")
                    }
                })
            }

            React.useEffect(() => {
                check();

            })
            const check = async () => {
                var data = {
                    id: cookie.id,
                    mobile: cookie.mobile
                }
    
    
                // 发起请求，确认cookie信息是否正确
                var result = await React.$HTTP.POST({
                    url: "/business/check",
                    params: data
                });
    
                if (result.code == 0) {
                    // 非法登录，需要删除cooike
    
                    // 删除cookie
                    React.$Cookies.remove('business', { path: '/' });
    
                    React.$Vant.Toast.fail({
                        message: result.msg,
                        onClose: () => {
                            navigate(result.url)
                        }
                    })
                }
    
                //保存用户信息到cookie
                React.$Cookies.save("business", result.data, { path: '/' })
            }
    

        }

  


        return (
            <>
                {
                    this.props.auth && <AuthLogin />
                }
                {this.props.component}
            </>
        )
    }

}

export default AuthRouter