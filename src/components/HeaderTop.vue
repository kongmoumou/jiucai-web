<template>
  <!-- 快捷导航栏 start-->
  <section class="shortcut">
    <div class="w1200">
      <!-- 左侧部分 -->
      <div class="fl">
        <ul>
          <li>韭菜商城欢迎您! &nbsp;&nbsp;</li>
          <li>
            <!-- 这两个页面还没写 -->
            <router-link id="login-a" :to="{name: 'login'}">
              登录
            </router-link>
            <a id="userinfo-a" href="userinfo.html" style="display: none;">用户信息</a>
            <i>&nbsp;&nbsp;</i>
            <router-link id="register-a" :to="{ name: 'register' }" class="style_red">
              注册
            </router-link>
            <a id="logout-a" href="#" style="display: none;">退出</a>
          </li>
        </ul>
      </div>
      <!-- 右侧部分 -->
      <div class="fr">
        <ul>
          <li><a id="login-a" href="myorder.html">我的订单</a></li>
          <li></li>
          <li><a id="login-a" href="userinfo.html">个人中心</a></li>
          <li></li>
          <li><a id="login-a" href="cart.html">购物车</a></li>
          <li></li>
          <li>关注商城<em class="iconfont icon-xia-1 arrow-icon"></em></li>
          <li></li>
          <li>客户服务</li>
          <li></li>
          <li>网站导航<em class="iconfont icon-xia-1 arrow-icon"></em></li>
        </ul>
      </div>
    </div>
  </section>
<!-- 快捷导航栏 end-->
</template>
