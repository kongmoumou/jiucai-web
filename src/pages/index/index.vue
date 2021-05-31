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
                            <router-link class="last-product" :to="{name: 'list', query: {categoryId: p?.categoryId}}" target="_blank">
                              <div class="figure figure-img ">
                                <div class="iconfont  icon-yulan search-more-icon"></div>
                              </div>
                              <i class="title-readmore ">浏览更多<em class="iconfont icon-jiantouyou"></em></i>
                            </router-link>
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
@import url('~/styles/index.css');
</style>
