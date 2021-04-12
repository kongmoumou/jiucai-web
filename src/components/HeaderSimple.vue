<template>
  <!-- header头部模块 start-->
  <header class="header w1200">
    <!-- logo的SEO设置 -->
    <div class="logo-container">
      <div class="logo">
        <h1>
          <router-link id="header-title" :to="{ name: 'mall' }">
            韭菜商城
          </router-link>
        </h1>
      </div>
      <div class="vertical-line"></div>
      <!-- 副标题 -->
      <h4 id="header-subtitle"></h4>
    </div>
  </header>
  <div class="header-line"></div>
<!-- header头部模块 end-->
</template>
