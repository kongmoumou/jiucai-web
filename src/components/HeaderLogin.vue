<template>
  <!-- header头部模块 start-->
  <header class="header w1200">
    <!-- logo的SEO设置 -->
    <div class="logo-container">
      <div class="logo">
        <h1>
          <router-link id="header-title" title="韭菜商城" :to="{ name: 'index' }">
            韭菜商城
          </router-link>
        </h1>
      </div>
      <div class="vertical-line"></div>
      <h4 id="header-subtitle"></h4>
    </div>
    <!-- 登录链接 -->
    <div class="login-nav">
      <i>已有账号<em class="iconfont icon-you"></em></i>
      <router-link :to="{ name: 'login' }">
        <em class="iconfont icon-xingmingyonghumingnicheng"></em>
        请登录
      </router-link>
    </div>
  </header>
  <div class="header-line"></div>
  <!-- header头部模块 end-->
</template>
