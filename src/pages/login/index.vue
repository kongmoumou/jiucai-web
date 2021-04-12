<script>
import { onMounted } from 'vue-demi'
import { _login_service } from '~/services/loginService'

export default {
  setup() {
    onMounted(() => {
      // 载入页面，判断是否登录
      _login_service.init()
      _login_service.binding()

      // 登录表单
      _login_service.login_form_fn()
    })
  },
}
</script>

<route lang="yaml">
meta:
  layout: mall
  head:
    title: 韭菜商城 - 登录
</route>
<template>
  <HeaderSimple />
  <!-- 背景部分 -->
  <div class="bg-wrap">
    <div class="login-wrap">
      <div class="login-top">
        <p>用户登录</p>
      </div>
      <!-- 提交表单 -->
      <div class="login-form">
        <form class="layui-form" action="post">
          <div class="login-username ">
            <em class="iconfont icon-xingmingyonghumingnicheng"></em>
            <input
              name="username"
              type="text"
              class="login-text"
              lay-verify="verify_login"
              autocomplete="off"
              placeholder="请输入用户名"
            >
          </div>
          <div class="login-password">
            <em class="iconfont icon-yonghuming"></em>
            <input
              name="password"
              type="password"
              class="login-text"
              lay-verify="verify_login"
              autocomplete="off"
              placeholder="请输入密码"
            >
          </div>
          <div class="login-btn">
            <button id="login-submit" class="layui-btn" type="button" lay-submit lay-filter="form-login">
              登录
            </button>
          </div>
        </form>
      </div>
      <!-- 注册，找回密码模块 -->
      <div class="register-forget">
        <ul>
          <li>
            <router-link :to="{ name: 'register' }">
              立即注册
            </router-link>
          </li>
          <li>&nbsp;&nbsp;</li>
          <li>
            <router-link :to="{ name: 'recover' }">
              忘记密码
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="header-line"></div>
</template>

<style>
.unfinish {
    height: 600px;
    background-color: pink;
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

/* 欢迎登陆 */

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
    background-image: url('/image/login-bg.png');
    background-size: cover;
}

/* 登录box */

.login-wrap {
    position: absolute;
    z-index: 2;
    width: 350px;
    height: 340px;
    top: 100px;
    right: 180px;
    border: 1px solid #ddd;
    background-color: white;
}

.login-top {
    /* position: absolute; */
    height: 52px;
    font-size: 16px;
    line-height: 52px;
    color: #333;
    border-bottom: 1px solid #ddd;
    background-color: #f8f8f8;
}

.login-top p {
    font-weight: bold;
    text-align: center;
    color: var(--jiucai-green);
}

.login-form {
    /* 登录表单 */
    position: relative;
    /* top: 30px; */
    left: 45px;
}

.login-form em {
    /* background-color: violet; */
    color: #d2d2d2;
    font-size: 2em;
}

.login-username {
    /* 用户名部分 */
    margin-top: 30px;
}

.login-username em {
    position: absolute;
    top: 0px;
    left: 4px;
}

.login-password {
    /* 密码部分 */
    margin-top: 20px;
}

.login-password em {
    position: absolute;
    top: 55px;
    left: 4px;
}

.login-text {
    border: 1px solid #ccc;
    width: 260px;
    height: 35px;
    outline: none;
    font-size: 14px;
    padding-left: 40px;
}

.login-err-msg {
    display: flex;
    margin-top: 20px;
    align-items: center;
    height: 30px;
    /* display: none; */
}

.login-err-msg em {
    font-size: 1.8em;
    color: red;
}

.login-err-msg p {
    margin-left: 10px;
    font-size: 13px;
    color: red;
}

.login-btn button {
    /* 登录按钮 */
    margin-top: 20px;
    /* position: absolute; */
    line-height: 100%;
    width: 260px;
    background-color: var(--jiucai-green);
    /* float: left; */
    font-size: 14px;
    text-align: center;
    /* margin-bottom: 30px; */
}

.login-form-line {
    margin-left: -45px;
    width: 100%;
    border-bottom: 1px solid #ddd;
}

.register-forget {
    float: right;
    margin-top: 10px;
    margin-right: 50px;
}

.register-forget ul li {
    display: inline;
    font-size: 12px;
}
</style>
