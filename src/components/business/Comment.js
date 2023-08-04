import React from "react";

const Comment = () => {
    // 初始化navigate
    let navigate = React.$Router.useNavigate();



    // 获取cookie上的用户信息
    var cookie = React.$Cookies.load("business") ? React.$Cookies.load("business") : {}

    if (Object.getOwnPropertyNames(cookie).length > 0) {
        for (var key in cookie) {
            if (!cookie[key]) {
                cookie[key] = ''
            }
            if (key == "avatar_text") {
                cookie[key] = [{
                    url: cookie[key]
                }]
            }
        }
    }

    return (
        <>
            <React.$Vant.NavBar
                title="评价"
                onClickLeft={() => navigate(-1)}
            />


        </>
    )
}

export default Comment