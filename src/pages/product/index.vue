<script>
import { onMounted } from 'vue-demi'
import { _product_service } from '~/services/productService'

export default {
  setup() {
    // 请求商品信息
    onMounted(() => {
      console.log('service init');
      _product_service.init()
      _product_service.binding()
    })
  },
}
</script>

<route lang="yaml">
meta:
  layout: mall
  head:
    title: 韭菜商城 - 商品详情
</route>

<template>
  <HeaderSearch />
  <div class="header-line"></div>
  <!-- 待完善box start-->
  <div class="bg-box">
    <div class="w1200">
      <div class="main-box">
        <!-- 产品面包屑导航 -->
        <div class="breadcrumb-box">
          <span id="crumb-view"></span>
        </div>

        <!-- view渲染 -->
        <div id="view">
          <div class="cart-empty">
            该商品不存在或已下架！
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 待完善box end-->

  <div class="header-line"></div>
</template>

<style>
/* 背景设置 */

.bg-box {
    background-color: white;
}

.main-box {
    /* position: relative; */
    /* height: 1200px; */
    /* background-color: green; */
    /* text-align: center; */
}

/* 面包屑导航样式控制 */

.breadcrumb-box {
    display: block;
    /* float: left; */
    text-align: left;
    margin-top: 10px;
    /* margin-left: 10px; */
}

.product-detail {
    margin-top: 10px;
}

/* 产品图片Box大小样式 */

.detail-img-box {
    /* float: left; */
    display: inline-block;
    width: 500px;
    height: 500px;
}

/* slider图片大小设置 */

.layui-carousel img {
    display: block;
    width: 100%;
    height: 100%;
}

/* 产品信息box */

.product-info-box {
    float: right;
    width: 650px;
    height: 500px;
    text-align: left;
    /* background-color: pink; */
}

.product-title {}

/* 产品主标题 */

.main-title {
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: 400;
    color: #212121;
}

/* 产品副标题 */

.sub-title {
    color: #b0b0b0;
    margin: 0;
    padding: 0;
    padding-top: 8px;
    line-height: 1.5;
}

.price_style {
    font-size: 26px;
    color: var(--jiucai-red);
    font-weight: bold;
    vertical-align: baseline;
    line-height: 1;
    margin: 8px 0;
    margin-top: 10px;
    margin-left: 2px;
}

.product-line {
    margin-top: 12px;
    border-bottom: 1px solid #e0e0e0;
}

.stock-box {
    margin-top: 10px;
    padding: 12px 12px;
    position: relative;
    background: #fafafa;
    border: 1px solid #e0e0e0;
    text-align: center;
}

.stock-box h4 {
    display: inline;
    font-size: 18px;
}

.product-cnt {
    background: #f9f9fa;
    padding: 12px;
    margin-top: 10px;
    text-align: center;
}

.product-cnt h4 {
    display: inline;
    font-size: 18px;
}

.cart-add,
.cart-add em,
.cart-add i {
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
}

.cart-add button {
    background-color: var(--jiucai-green);
    width: 180px;
    height: 40px;
}

.detail-info-box {
    display: block;
    width: 100%;
    /* height: 800px; */
    /* background-color: pink; */
}

.detail-info-bar h2 {
    /* margin: 0; */
    margin-left: 5px;
    font-size: 18px;
    font-weight: bold;
    /* line-height: 60px; */
    color: #424242;
    /* float: left; */
}

.detail-info {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 16px;
    color: #424242;
    margin-bottom: 10px;
}

.product-cnt input {
    display: inline;
    padding: 0;
    text-align: center;
    font-size: 14px;
    width: 80px;
    height: 35px;
    line-height: 35px;
}

.product-cnt input:hover {
    border-color: var(--jiucai-green)!important;
}

.product-cnt button {
    width: 34px;
    height: 34px;
    line-height: 34px;
    padding: 0;
    margin-top: -5px;
    font-size: 18px;
}

.product-cnt button:hover {
    border-color: var(--jiucai-green);
    color: var(--jiucai-green);
}

.product-cnt .layui-btn .iconfont {
    margin: 0 auto;
}

/* 飞入的图片样式 */

.u-flyer {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    position: fixed;
    z-index: 999;
}

.cart-empty {
    text-align: center;
    font-size: 36px;
    margin: 0 auto;
}

#crumb-view {
    display: inline;
}

</style>
