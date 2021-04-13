<template>
  <!-- header头部模块 start-->
  <header class="header w1200">
    <!-- logo的SEO设置 -->
    <div class="logo">
      <h1>
        <router-link
          id="header-title"
          title="韭菜商城商城"
          :to="{ name: 'index' }"
        >
          韭菜商城商城
        </router-link>
      </h1>
    </div>
    <!-- search搜索box -->
    <form class="layui-form" action="list.html">
      <div class="search">
        <input id="categoryId" type="hidden" name="categoryId" />
        <input
          id="keyword"
          type="search"
          name="keyword"
          lay-verify="verify_search"
          autocomplete="off"
          placeholder="请输入搜索的关键词"
        />
        <input id="orderBy" type="hidden" name="orderBy" value="price_desc" />
        <input id="pageSize" type="hidden" name="pageSize" value="20" />
        <input id="pageNum" type="hidden" name="pageNum" value="1" />
        <button id="search-submit" lay-submit lay-filter="form-search">
          <em class="iconfont icon-sousuo-search search-icon"></em>搜索
        </button>
      </div>
    </form>
    <!-- 购物车box -->
    <a href="cart.html" target="_blank" title="我的购物车">
      <div id="my-cart" class="cart">
        <em class="iconfont icon-gouwuche1 cart-icon"></em> 我的购物车
        <span class="layui-badge" style="background-color: var(--jiucai-green)"
          ><i id="cart-item-nums" value="0">0</i></span
        >
      </div>
    </a>
  </header>
  <!-- header头部模块 end-->
</template>
