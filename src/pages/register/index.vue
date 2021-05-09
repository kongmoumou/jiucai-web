<route lang="yaml">
meta:
  head:
    title: 韭菜商城 - 注册
</route>

<script>
import { onMounted } from 'vue-demi'
import { _common_request } from '~/utils'

export default {
  setup() {
    onMounted(() => {
      // 表单验证
      layui.use('form', () => {
        const form = layui.form

        // 登录表单验证
        form.verify({
        // 用户名验证
          verify_user_pwd(value, item) {
            // 判断是账号还是密码
            if (item.name == 'username')
              var typestr = '用户名'
            else
              var typestr = '密码'

            if (new RegExp('^\s*$').test(value))
              return `${typestr}不能为空！`

            // 判断是账号还是密码
            if (item.name == 'username') {
              if (!/^[\S]{4,16}$/.test(value))
                return `${typestr}必须4到16且不能出现空格！`
            }
            else if (item.name == 'password' || item.name == 'confirm_password') {
              if (!/^[\S]{6,20}$/.test(value))
                return `${typestr}必须6到20且不能出现空格！`

              // 判断两次输入的密码是否相同
              if ($('input[name=password]').val() != null && $('input[name=confirm_password]').val() != null) {
                if ($('input[name=password]').val() != $('input[name=confirm_password]').val())
                  return '两次密码输入不一致！'
              }
            }
            if (!/^[a-zA-Z0-9_\u4E00-\u9FA5\\s·]+$/.test(value))
              return `${typestr}不能含有特殊字符！`

            if (/(^\_)|(\__)|(\_+$)/.test(value))
              return `${typestr}首尾不能出现下划线'_'！`

            if (/^\d+\d+\d$/.test(value))
              return `${typestr}不能全为数字！`
          },
          verify_forget_question(value, item) {
            if (item.name == 'question')
              var typestr = '问题'
            else
              var typestr = '答案'

            if (new RegExp('^\s*$').test(value))
              return `${typestr}不能为空！`
          },
        })

        // 监听提交
        form.on('submit(form-register)', (data) => {
          console.log(data.field)
          const res = _common_request.ajaxRequest('register', data.field)
          console.log(res)
          _common_validate.validate(res, 'login')
          return false
        })
      })
    })
  },
}
</script>
<template>
  <HeaderLogin />
  <div class="background-box">
    <div class="w1200">
      <div class="reg-box">
        <div class="reg-wrap">
          <div class="reg-pic">
            <em class="iconfont icon-zhuce1"></em>
            <i>填写注册资料</i>
          </div>
          <form class="layui-form" action="post">
            <div class="reg-container-center">
              <input
                type="text"
                name="username"
                required
                lay-verify="verify_user_pwd"
                placeholder="请输入用户名"
                autocomplete="off"
                class="layui-input"
              >
            </div>
            <div class="reg-container-center">
              <input
                type="password"
                name="password"
                required
                lay-verify="verify_user_pwd"
                placeholder="请输入密码"
                autocomplete="off"
                class="layui-input"
              >
            </div>
            <div class="reg-container-center">
              <input
                type="password"
                name="confirm_password"
                required
                lay-verify="verify_user_pwd"
                placeholder="请再次输入密码"
                autocomplete="off"
                class="layui-input"
              >
            </div>
            <div class="reg-container-center">
              <input
                type="text"
                name="email"
                required
                lay-verify="email"
                placeholder="请输入联系邮箱"
                autocomplete="off"
                class="layui-input"
              >
            </div>
            <div class="reg-container-center">
              <input
                type="text"
                name="phone"
                required
                lay-verify="phone"
                placeholder="请输入手机号码"
                autocomplete="off"
                class="layui-input"
              >
            </div>

            <div class="reg-container-center" style="width:300px;">
              <select name="question" lay-verify="verify_forget_question">
                <option value="">
                  请选择找回密码的问题
                </option>
                <optgroup label="城市记忆">
                  <option value="你最喜欢的城市">
                    你最喜欢的城市？
                  </option>
                  <option value="你大学所在城市">
                    你大学所在城市？
                  </option>
                </optgroup>
                <optgroup label="学生时代">
                  <option value="你的学号">
                    你的学号？
                  </option>
                  <option value="你最喜欢的老师">
                    你最喜欢的老师？
                  </option>
                  <option value="你最讨厌的一门课">
                    你最讨厌的一门课？
                  </option>
                </optgroup>
              </select>
            </div>

            <div class="reg-container-center">
              <input
                type="text"
                name="answer"
                required
                lay-verify="verify_forget_question"
                placeholder="请设置找回密码的答案"
                autocomplete="off"
                class="layui-input"
              >
            </div>

            <div class="reg-container-center">
              <button id="register-submit" class="layui-btn" type="button" lay-submit lay-filter="form-register">
                立即注册
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="header-line"></div>
  <MallFooter />
</template>

<style>
.unfinish {
    height: 600px;
    background-color: white;
}

/* logo部分 */

.logo-container {
    position: relative;
    display: inline;
}

/* 垂直分割线 */

.vertical-line {
    position: absolute;
    left: 265px;
    top: 25px;
    width: 1px;
    height: 55px;
    background: #dfdfdf;
}

/* 会员注册 */

.logo-container h4 {
    position: absolute;
    left: 290px;
    top: 28px;
    width: 200px;
    height: 50px;
    font-size: 30px;
    color: #000000;
    font-weight: 400;
}

/* 背景部分 */

.bg-wrap {
    position: relative;
    height: 600px;
}

/* 登录链接部分 */

.login-nav {
    text-align: center;
    font-size: 16px;
    float: right;
    margin-top: 40px;
    margin-right: 130px;
    color: #999;
}

.login-nav a {
    color: var(--jiucai-green);
}

.login-nav a:hover {
    cursor: pointer;
    text-decoration: underline;
}

.login-nav em:first-child {
    font-size: 1em;
    margin-left: 2px;
}

.login-nav em:last-child {
    font-size: 1.1em;
    margin-right: 2px;
}

/* 背景设置 */

.background-box {
    position: relative;
    /* height: 600px; */
    background-image: url('/image/login-bg.png');
    background-size: cover;
}

/* 注册box部分 */

.reg-box {
    height: 700px;
    width: 100%;
    text-align: center;
}

.reg-wrap {
    width: 600px;
    height: 700px;
    /* padding: 20px; */
    border: 1px solid #eee;
    margin: 0 auto;
    background-color: white;
}

.reg-pic {
    position: relative;
    height: 60px;
    font-size: 20px;
    color: var(--jiucai-green);
    margin-top: 50px;
    margin-right: 145px;
}

.reg-pic em {
    position: relative;
    font-size: 1.5em;
}

.reg-pic i {
    position: absolute;
    bottom: 25px;
    margin-left: 5px;
}

.reg-container-center {
    /* display: inline; */
    margin: 0 auto;
    margin-bottom: 25px;
}

.reg-container-center input {
    width: 300px;
    height: 40px;
    margin: 0 auto;
}

.reg-container-center button {
    width: 300px;
    background-color: var(--jiucai-green);
}
</style>
