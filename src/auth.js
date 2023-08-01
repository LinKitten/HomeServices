import React from 'react'

class AuthRouter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }




    render() {

        const AuthLogin = () => {
            // 初始化navigate
            let navigate = React.$Router.useNavigate();

            React.useEffect(() => {
                // 获取cookie上的用户信息
                var cookie = React.$Cookies.load("business") ? React.$Cookies.load("business") : {}

                if (Object.getOwnPropertyNames(cookie).length <= 0) {
                    React.$Vant.Toast.fail({
                        message: "请先登录",
                        onClose: () => {
                            navigate("/login")
                        }
                    })
                }

            })

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