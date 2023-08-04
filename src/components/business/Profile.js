import React from 'react';


// 城市地区的数据
import RegionData from '@/services/region.js'



const Profile = () => {
    // 初始化navigate
    let navigate = React.$Router.useNavigate();
    // 实例化表单对象
    const [form] = React.$Vant.Form.useForm()


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


    // 设置状态数据
    var [business, SetBusiness] = React.useState(cookie)

    // 初始化性别弹框状态
    const [ShowGender, SetGender] = React.useState(false)
    const [show, SetShow] = React.useState(false)
    const GenderList = [
        { text: '保密', value: "0" },
        { text: '男', value: "1" },
        { text: '女', value: "2" },
    ]

    // 获取最深地区码

    var code = []

    if (cookie.province) {
        code.push(cookie.province)
    }

    if (cookie.city) {
        code.push(cookie.city)
    }

    if (cookie.district) {
        code.push(cookie.district)
    }

    console.log(code);

    // 地区
    const [region, SetRegion] = React.useState(code);


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
        nickname: [
            {
                required: true,
                message: '请输入昵称',
            },
        ],
        email: [
            {
                required: true,
                message: '请输入邮箱',
            },
            {
                pattern: /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/,
                message: '邮箱格式有误'
            }
        ],
    }

    //选择性别弹框选择调用的
    const GenderSelect = (value, arr) => {
        // 关闭弹框
        SetGender(false)

        // 更改表单中的值
        if (arr) {
            form.setFieldsValue({
                "gender_text": arr.text,
                "gender": arr.value,
            })
        }


    }
    // 表单提交 （修改资料）
    const profile = async values => {
        var data = {
            id: business.id,
            mobile: values.mobile,
            nickname: values.nickname,
            email: values.email
        }

        // 获取性别的值
        switch (values.gender_text) {
            case "保密":
                data.gender = "0"
                break;
            case "男":
                data.gender = "1"
                break;
            case "女":
                data.gender = "2"
                break;
            default:
                data.gender = "0"
                break;
        }

        // 如果密码有修改就追加密码字段
        if (values.password) {
            data.password = values.password
        }
        //判断地区的数据是否为空
        if (region) {
            //获取数组中最后一个元素 追加数据
            data.region = region[region.length - 1]
        }

        // 如果有文件上传就追加头像字段
        if (values.avatar_text[0].file) {
            data.avatar = values.avatar_text[0].file;
        }

        // 开始发请求
        var result = await React.$HTTP.UPLOAD({
            url: "/business/profile",
            params: data
        })

        if (result.code == 0) {
            React.$Vant.Toast.fail(result.msg)
            return false
        }

        React.$Vant.Toast.success({
            message: result.msg,
            onClose: () => {
                //保存最新的用户信息cookie
                React.$Cookies.save("business", result.data, { path: '/' })
                navigate(-1)
            }
        })



    }


    return (
        <>
            <link rel="stylesheet" href="/assets/css/profile.css" type="text/css" />

            <React.$Vant.NavBar
                title="基本资料"
                onClickLeft={() => navigate(-1)}
            />

            <div className="wo">
                <img src={business.avatar_text[0].url} />
                <p><a href="">{business.nickname}</a></p>
            </div>
            <div className='cart'>
                <React.$Vant.Form
                    form={form}
                    onFinish={profile}
                    initialValues={business}
                    footer={
                        <div style={{ margin: '16px 16px 0' }}>
                            <React.$Vant.Button round nativeType='submit' type='primary' block color='#ff2c4c'>
                                修改资料
                            </React.$Vant.Button>
                        </div>
                    }>

                    {/* 昵称 */}
                    <React.$Vant.Form.Item
                        name="nickname"
                        label="昵称"
                        rules={rules.nickname}
                    >
                        <React.$Vant.Input placeholder='请输入昵称' />
                    </React.$Vant.Form.Item>

                    {/* 手机号码 */}
                    <React.$Vant.Form.Item
                        name='mobile'
                        label='手机号码'
                        rules={rules.mobile}
                    >
                        <React.$Vant.Input placeholder="请输入手机号码" />
                    </React.$Vant.Form.Item>

                    {/* 邮箱 */}
                    <React.$Vant.Form.Item
                        name='email'
                        label='邮箱'
                        rules={rules.email}
                    >
                        <React.$Vant.Input placeholder="请输入邮箱" />
                    </React.$Vant.Form.Item>

                    {/* 密码 */}
                    <React.$Vant.Form.Item
                        name="password"
                        label="密码"
                    >
                        <React.$Vant.Input type="password" placeholder='请输入密码' />
                    </React.$Vant.Form.Item>

                    {/* 性别 */}
                    <React.$Vant.Form.Item
                        name='gender_text'
                        label='性别'
                        onClick={() => SetGender(true)}
                    >
                        <React.$Vant.Input placeholder="请选择性别" readOnly />
                    </React.$Vant.Form.Item>
                    {/* 性别选择弹窗 */}
                    <React.$Vant.Popup visible={ShowGender} onClose={() => SetGender(false)} position='bottom'>
                        <React.$Vant.Picker
                            defaultValue={business.gender}
                            columns={GenderList}
                            onConfirm={GenderSelect}
                            onCancel={() => SetGender(false)}
                        />
                    </React.$Vant.Popup>

                    {/* 所在地区 */}
                    <React.$Vant.Form.Item  label='地区' isLink>
                        <React.$Vant.Cascader
                            popup={{ round: true }}
                            value={region}
                            onFinish={SetRegion}
                            title='请选择所在地区'
                            options={RegionData}
                        >
                            {(_, selectedRows, actions) => (
                                <React.$Vant.Input
                                    value={selectedRows.map(el => el.text).join('-')}
                                    readOnly
                                    placeholder='请选择所在地区'
                                    onClick={() => actions.open()}
                                />
                            )}
                        </React.$Vant.Cascader>
                    </React.$Vant.Form.Item>

                    {/* 头像上传 */}
                    <React.$Vant.Form.Item
                        name='avatar_text'
                        label='更改头像'
                    >
                        <React.$Vant.Uploader maxCount={1} />
                    </React.$Vant.Form.Item>

                </React.$Vant.Form>
            </div>




        </>
    )
}

export default Profile