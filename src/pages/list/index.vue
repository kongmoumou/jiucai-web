<script>
import { onMounted } from 'vue-demi'
import { _list_service } from '~/services/listService'

export default {
  setup() {
    onMounted(() => {
      _list_service.init()
    })
  },
}
</script>

<route lang="yaml">
meta:
  layout: mall
  title: 韭菜商城 - 列表
</route>

<template>
  <HeaderSearch />
  <div class="header-line"></div>
  <!-- 待完善box start-->
  <!-- 部分还未完善 -->
  <div class="main-container">
    <div class="w1200">
      <div class="list-container">
        <!-- 商品种类box -->
        <div class="category-select-wrap">
          <div class="title">
            商品种类
          </div>
          <div id="select-box" class="select-box">
            <!-- 商品种类的树形选择模块 -->
            <div id="list-category-tree" class="list-category-tree"></div>
          </div>
        </div>

        <!-- 产品面包屑导航 -->
        <div class="breadcrumb-box">
          <!-- 面包屑渲染 -->
          <span id="crumb-view"></span>

          <!-- 排序 -->
          <div id="list-order" class="list-order">
            <span class="order-itme">
              <button type="button" name="price" class="layui-btn layui-btn-sm layui-btn-primary">
                <i class="name">价格</i>
                <i id="order_icon" class="iconfont icon-xia-1"></i>
              </button>
            </span>
            <span class="order-itme">
              <button type="button" name="stock" class="layui-btn layui-btn-sm layui-btn-primary">
                <i class="name">库存</i>
                <i id="order_icon" class="iconfont icon-xia-1" style="display: none;"></i>
              </button>
            </span>
          </div>
        </div>

        <!-- 商品展示box -->
        <div id="product-wrap-view" class="product-wrap-view"></div>
      </div>

      <!-- 页数展示Box -->
      <div class="pages-wrap">
        <div id="page-controller-view" class="page-controller-view"></div>
      </div>
    </div>
  </div>
  <!-- 待填写box end-->

  <div class="header-line "></div>
  <!-- 底部信息栏 -->
</template>

<style>
@import url('~/styles/index.css');

.main-container {
    background-color: #f5f5f5;
}

.list-container {
    display: inline-block;
    /* height: 700px; */
    /* background-color: green; */
}

.list-category-tree {
    /* background-color: pink; */
}

.category-select-wrap {
    border: 1px solid #eaeaea;
    overflow: hidden;
    /* border: 1px dashed #dedede; */
    background-color: white;
    margin-top: -1px;
    /* margin-bottom: 10px; */
}

/* 树形选择组件横向分布 */

.list-category-tree .layui-tree {
    display: inline-flex;
    margin: 10px;
    line-height: 0px;
}

.category-select-wrap .title {
    font-size: 14px;
    color: #999;
    float: left;
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 14px;
}

.category-select-wrap .select-box {
    /* margin-left: 110px;
    padding: 8px 120px 4px 0; */
    overflow: hidden;
    float: left;
    margin: 4px;
    width: 1100px;
}

.pages-wrap {
    display: block;
    text-align: center;
}

.row {
    margin-left: -12px;
}

.layui-laypage .layui-laypage-skip {
    background-color: #f5f5f5;
}

/* 面包屑导航样式控制 */

.breadcrumb-box {
    display: block;
    /* float: left; */
    text-align: left;
    margin-top: 5px;
    margin-bottom: 10px;
    margin-left: 5px;
    /* background-color: green; */
    /* height: 30px; */
}

.layui-tree-entry {
    padding: 0;
}

/* 排序 */

.list-order {
    display: inline;
    margin-left: 20px;
    position: relative;
    top: -2px;
}

.list-order .name {
    font-size: 13px!important;
    color: #666;
}

.list-order button {
    height: 22px;
    width: 60px;
    line-height: 22px;
}

.list-order button:hover {
    /* border: 1px solid var(--jiucai-green); */
    border-color: var(--jiucai-green);
}

.list-order #order_icon {
    font-size: 11px!important;
}
</style>
