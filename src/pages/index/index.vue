<route lang="yaml">
meta:
  layout: mall
  head:
    title: 韭菜商城 - 首页
</route>

<script>
import { onMounted, ref } from 'vue-demi'
import { _index_service } from '~/services/indexService'

export default {
  setup() {
    const data = ref(null)
    // 请求商品信息
    onMounted(() => {
      // 回到顶部按钮
      _index_service.back2top()
      // slider优先渲染
      _index_service.img_render()
      // 0为父类ID
      const _data = _index_service.useData(0)
      data.value = _data
    })
    return {
      data,
    }
  },
}
</script>

<template>
  <HeaderSearch />
  <div class="header-line"></div>

  <!-- 回到顶部 -->
  <div id="rTop" class="rTop">
    <em class="iconfont icon-tubiao102"></em>
  </div>
  <!-- 待完善box start-->
  <!-- 部分还未完善 -->
  <div class="main-container">
    <div class="w1200">
      <!-- 含图片slider的主盒 -->
      <div class="main-box">
        <!-- <div class="main-box"> -->
        <div class="site-nav">
          <ul>
            <li>
              <!-- <div> -->
              <em class="iconfont icon-diantileimu"></em>
              <i>所有分类</i>
              <!-- </div> -->
            </li>
            <div class="site-nav-line"></div>

            <li>
              <a href="#floor-header-category-view-0">
                <div>
                  <em class="iconfont icon-shumashouji"></em>
                  <i>数码家电</i>
                  <em class="iconfont icon-jiantouyou"></em>
                </div>
              </a>
            </li>

            <li>
              <a href="#floor-header-category-view-1">
                <div>
                  <em class="iconfont icon-shoes"></em>
                  <i>服饰鞋包</i>
                  <em class="iconfont icon-jiantouyou"></em>
                </div>
              </a>
            </li>

            <li>
              <a href="#floor-header-category-view-2">
                <div>
                  <em class="iconfont icon-huazhuangpin"></em>
                  <i>美容美妆</i>
                  <em class="iconfont icon-jiantouyou"></em>
                </div>
              </a>
            </li>

            <li>
              <a href="#floor-header-category-view-3">
                <div>
                  <em class="iconfont icon-jiatingqingji"></em>
                  <i>个人清洁</i>
                  <em class="iconfont icon-jiantouyou"></em>
                </div>
              </a>
            </li>

            <li>
              <a href="#floor-header-category-view-4">
                <div>
                  <em class="iconfont icon-huwaiyundong"></em>
                  <i>户外旅行</i>
                  <em class="iconfont icon-jiantouyou"></em>
                </div>
              </a>
            </li>

            <li>
              <a href="#floor-header-category-view-5">
                <div>
                  <em class="iconfont icon-shipin"></em>
                  <i>美食酒水</i>
                  <em class="iconfont icon-jiantouyou"></em>
                </div>
              </a>
            </li>

            <li>
              <a href="#floor-header-category-view-6">
                <div>
                  <em class="iconfont icon-jiafangjiashi"></em>
                  <i>居家生活</i>
                  <em class="iconfont icon-jiantouyou"></em>
                </div>
              </a>
            </li>

            <li>
              <a href="#floor-header-category-view-7">
                <div>
                  <em class="iconfont icon-jingxuanshichang"></em>
                  <i>图书文娱</i>
                  <em class="iconfont icon-jiantouyou"></em>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="slide-img">
          <div id="slider" class="layui-carousel">
            <div carousel-item="">
              <!-- <div><img src=""></div> -->
              <div><img src="/image/slide-1.png"></div>
              <div><img src="/image/slide-2.png"></div>
              <div><img src="/image/slide-3.png"></div>
              <div><img src="/image/slide-4.png"></div>
              <div><img src="/image/slide-5.png"></div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>

      <!-- 所有楼层box -->
      <div id="floor-all-view">
        <div v-for="(parent, i) in data?.parents?.data" :key="String(i)" class="category-item-box">
          <div class="category-floor">
            <div class="box-hd">
              <div class="floor-box">
                <!-- 标题 -->
                <!-- <h2 class="floor-header-title">{{ d.data[index].name }}</h2> -->

                <!-- 改用tab的样式 -->
                <div class="layui-tab layui-tab-brief more">
                  <div class="floor-header-wrapper">
                    <h2 class="floor-header-title">
                      {{ parent.name }}
                    </h2>
                    <!-- 头部右边的类别 -->
                    <ul :id="`floor-header-category-view-${ String(i) }`" class="layui-tab-title">
                      <!-- 商品栏头部view的渲染模板 -->
                      <!-- 部分类别商品展示 -->
                      <!-- 允许渲染8个分类 -->
                      <li v-for="(cat, catI) in ((data?.childrens?.[i]?.data) || []).slice(0, 8)" :key="String(catI)" :class="{'layui-this': catI === 0}">
                        {{ cat.name }}
                      </li>
                    </ul>
                  </div>

                  <!-- box中显示链接 -->
                  <div :id="`floor-product-box-view-${ String(i) }`" class="layui-tab-content">
                    <!-- 商品栏展示盒子view的渲染模板 -->
                    <!-- 商品展示box，每页最多展示10个，最后一个为浏览更多的同类商品-->
                    <div v-for="(item, itemI) in (data?.items[i] || [[...Array(9)]])" :key="String(itemI)" :class="['item-show-box','layui-tab-item', itemI === 0 ? 'layui-show' : '']">
                      <div class="row">
                        <!-- 小于9个 -->
                        <ProductCard v-for="(p, pI) in item?.slice(0, 9)" :key="String(pI)" :data="p" />
                        <div v-for="(p, pI) in item?.slice(0, 1)" :key="String(pI)">
                          <li class="brick-item brick-item-m brick-item-m-2">
                            <a class="last-product" :href="`./list.html?categoryId=${p?.categoryId }`" target="_blank">
                              <div class="figure figure-img ">
                                <div class="iconfont  icon-yulan search-more-icon"></div>
                              </div>
                              <i class="title-readmore ">浏览更多<em class="iconfont icon-jiantouyou"></em></i>
                            </a>
                          </li>
                          <!-- 空值 -->
                          <!-- 最后一个 浏览更多 -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 待填写box end-->

  <div class="header-line"></div>
</template>

<style>
.unfinish {
    height: 600px;
    background-color: green;
}

.main-container {
    background-color: #f5f5f5;
    padding-bottom: 20px;
}

.main-box {
    /* margin-top: 15px; */
    height: 450px;
    /* margin-bottom: 20px; */
}

.site-nav,
.slide-img {
    height: 450px;
}

/* 左侧类别导航栏 */

.site-nav {
    float: left;
    width: 150px;
    background: linear-gradient(90deg, var(--jiucai-green), #22c55e);
    /* background: linear-gradient(90deg, #b12718, var(--jiucai-green)); */
    text-align: center;
}

/* 第一栏 */

.site-nav ul li {
    color: #ffffff;
    margin: 0 auto;
    height: 50px;
}

/* 商品类别栏 */

.site-nav ul li div {
    color: #ffffff;
    margin: 0 auto;
    height: 50px;
}

.site-nav ul li a div {
    width: 97%;
}

.site-nav ul li:not(:last-child) a div {
    border-bottom: 0.5px solid #d2d2d2;
}

.site-nav ul li a div:hover {
    color: var(--jiucai-green);
    background-color: white;
}

/* 第一栏 */

.site-nav ul li:first-child {
    text-align: left;
    margin-left: 10px;
}

.site-nav ul li i {
    line-height: 50px;
    font-size: 12px;
}

/* 分割线 */

.site-nav a ul li {
    width: 97%;
    border-bottom: 0.5px solid #d2d2d2;
}

.site-nav ul li em {
    margin-right: 16px;
}

.site-nav ul li em:first-child {
    margin-left: 5px;
}

/* 小三角图标 */

.site-nav ul li em:last-child {
    float: right;
    padding-top: 16px;
    margin-right: 15px;
    font-size: 1em;
}

.site-nav-line {
    border-bottom: 0.5px solid #d2d2d2;
}

/* slider大小设置 */

.slide-img {
    float: right;
    width: 1050px;
}

/* slider图片大小设置 */

.layui-carousel img {
    display: block;
    width: 100%;
    height: 100%;
}

/* 楼层标题部分 */

.box-hd {
    position: relative;
    height: 58px;
    -webkit-font-smoothing: antialiased;
}

/* 楼层tabs的颜色样式 */

.layui-tab-brief .layui-tab-title .layui-this {
    color: var(--jiucai-green);
}

.layui-tab-brief .layui-tab-more li.layui-this:after,
.layui-tab-brief .layui-tab-title .layui-this:after {
    border-bottom: 2px solid var(--jiucai-green);
}

.layui-tab .layui-tab-title .li {
    font-size: 16px;
}

.floor-header-wrapper {
  @apply shadow-md;
  border-radius: 5px;
  padding: 5px 0 1px 10px;
  /* background-color: var(--bg-color); */
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 3;
}

.floor-header-title {
    position: absolute;
    margin: 0;
    font-size: 22px;
    font-weight: 200;
    color: #333;
    margin-left: 10px;
    top: 50%;
    transform: translateY(-50%);
}

.floor-header-content {
  padding-top: 15px;
}

.box-hd .title {
    display: block;
    margin: 0;
    font-size: 22px;
    font-weight: 200;
    /* line-height: 58px; */
    color: #333;
    padding-left: 10px;
}

.more {
    display: block;
    height: 675px;
    /* overflow: hidden; */
}

.box-hd .more {
    /* position: absolute;
    top: -5px;
    right: 0; */
}

.box-hd .more .tab-list {
    margin: 0;
    padding: 16px 0 0;
    list-style-type: none;
    font-size: 16px;
}

.box-hd .more .tab-list li.tab-active,
.xm-plain-box .box-hd .more .tab-list li:hover {
    color: #ff6700;
    border-bottom: 2px solid #ff6700;
}

.box-hd .more .tab-list li {
    margin: 0 0 0 30px;
}

.box-hd .more .tab-list li {
    display: inline-block;
    padding: 0;
    margin: 0 15px;
    color: #424242;
    border-bottom: 2px solid #f5f5f5;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    -webkit-transition: border .3s;
    transition: border .3s;
    cursor: pointer;
}

/* 商品brick的大box */

.item-show-box {
    width: 1200px;
    /* display: block;
    margin: 0 auto; */
    /* margin-top: 25px; */
}

/* 控制左边距离 */

.row {
    margin-left: -21px;
}

/* .item-show-box span {
    display: block;
    float: left;
    margin-left: 14px;
    min-height: 1px;
} */

/* 边缘距离 */

.home-brick-box .brick-list,
.home-brick-box .brick-promo-list {
    margin: 0 0 -14px -14px;
}

/* 部分类别商品展示box */

.category-item-box {
    height: 680px;
    /* background-color: #f5f5f5; */
    /* margin-top: 20px; */
}

.category-floor-1 {}

/* 商品盒子 */

.brick-item-m-2 {
    height: 300px;
    padding: 20px 0;
    background-color: white;
}

/* 类别标题右对齐 */

.floor-box .layui-tab-title li {
    float: right;
}

/* 去除Tabs的下划线 */

.floor-box .layui-tab-title {
    border-bottom-style: none!important;
}

/* 去除Tabs的选中的边框 */

.layui-tab-title .layui-this:after {
    border-style: none;
}

/* 商品部分 */

.brick-item {
    position: relative;
    z-index: 1;
    float: left;
    margin-left: 14px;
    width: 228px;
    margin-bottom: 14px;
    /* background: #fff; */
    -webkit-transition: all .2s linear;
    transition: all .2s linear;
    border-radius: 5px;
}

/* 鼠标经过盒子 */

.brick-item:hover {
    z-index: 2;
    -webkit-box-shadow: -2 15px 30px rgba(0, 0, 0, .1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
}

/* 图片部分 */

.brick-item-m-2 .figure-img,
.brick-item-m-2 .figure-img img {
    width: 160px;
    height: 160px;
    margin: 0 auto 18px;
}

/* 标题部分 */

/* .brick-item-m-2 .title {
    margin: 0 10px 2px!important;
} */

.brick-item-m .desc,
.brick-item-m-2 .price,
.brick-item-m .title {
  margin: 0 14px 2px !important;
}

.brick-item-m .title {
    padding: 0;
    margin: 0 10px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

/* 描述部分 */

.brick-item-m .desc {
    margin: 0 10px 10px;
    height: 36px;
    font-size: 12px;
    color: #b0b0b0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

/* 价格部分 */

.brick-item-m .price {
    margin: 0 10px 10px;
    text-align: right;
    color: #f40;
}

.brick-item-m .price .num {
  font-size: 15px;
}

.search-more-icon {
    display: block;
    font-size: 8em;
    text-align: center;
    padding-top: 30px;
    /* color: #757575; */
    /* color: var(--jiucai-green); */
}

.title-readmore {
    display: block;
    /* margin: 0 110px 0 30px; */
    font-size: 18px;
    /* color: #757575; */
    /* color: var(--jiucai-green); */
    text-align: center;
    margin-left: 20px;
    margin-top: 35px;
}

.title-readmore em {
    font-size: 18px;
    margin-left: 10px;
}

.last-product:hover {
    color: var(--jiucai-green);
}

/* 回到顶部 */

.rTop {
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: small;
    line-height: 40px;
    position: fixed;
    right: 65px;
    bottom: 0;
    margin: 5px;
    cursor: pointer;
    display: none;
    background-color: #fff;
    border: 1px solid #f5f5f5;
}

.rTop em {
    font-size: 3em;
}

.rTop:hover {
    border-color: var(--jiucai-green);
    color: var(--jiucai-green);
}
</style>
