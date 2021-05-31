// 导入公共模块
import { _common_request, _common_validate } from '~/utils'
import crumbNavView from '~/pages/product/crumbNavView.html?raw'
import productDetailView from '~/pages/product/productDetailView.html?raw'
// 导入搜索service
// const _search_service = require('service/search_service.js')
// 设置标题
// const _header_service = require('service/header_service.js')

const _product_service = {
  // 初始化
  init() {
    // 获取请求的商品信息，并进行渲染
    const productId = _common_request.getURLParam('productId')
    this.product_render(productId)
    // 读取购物车商品的数量
    // _search_service.cart_badge_add()
  },
  // 绑定标签
  binding() {

  },
  // 产品信息的渲染
  async product_render(poductId_param) {
    const _this = this
    // layui模板渲染

    // 调用layui需要的模块
    _this.layui_layer()

    layui.use(['laytpl', 'element'], async () => {
      const laytpl = layui.laytpl
      const element = layui.element
      // 对商品页面进行渲染
      const product_id = { productId: poductId_param }
      const response = await _common_request.ajaxRequest('get_product', product_id)
      // 商品存在才进行渲染

      if (response.status == -999) {
        layer.msg(`${response.msg} 3秒后返回主页。`, { icon: 7, time: 3000 }, () => {
          $(location).attr('href', '/')
        })
      }
      // -1商品不存在，则返回主页
      else if (response.status == -1) {
        layer.msg(`${response.msg} 3秒后返回主页。`, { icon: 2, time: 3000 }, () => {
          $(location).attr('href', '/')
        })
      }
      // 1失败
      else if (response.status == 1) {
        layer.msg(`${response.msg} 3秒后返回主页。`, { icon: 3, time: 3000 }, () => {
          $(location).attr('href', '/')
        })
      }
      // 0，商品存在则进行渲染
      else if (response.status == 0) {
        console.log(response)

        const param = { categoryId: response.data.categoryId }
        const res_crumb = await _common_request.ajaxRequest('get_category_tree', param)

        // console.log(res_crumb);

        // 面包屑导航渲染
        var getTpl = crumbNavView
        var view = document.getElementById('crumb-view')
        laytpl(getTpl).render(res_crumb, (html) => {
          view.innerHTML = html
        })
        element.render()

        // 设置网页标题
        // _header_service.set_title(response.data.name)

        // 商品信息的渲染
        var getTpl = productDetailView
        var view = document.getElementById('view')
        laytpl(getTpl).render(response, (html) => {
          view.innerHTML = html
        })

        // 面包屑导航渲染
        _this.layui_element()
        // 图片slider渲染
        _this.img_render()

        // 商品数量的加减，必须在页面渲染完成后再加载
        _this.cart_calc()

        _this.cart_fly_anim()

        _this.form_cart_add()
      }
      // 其他情况
      else {
        // layer.msg(`${response.msg} Response code:${response.status}。` + ' 3秒后返回主页。', { icon: 3, time: 3000 }, () => {
        //   $(location).attr('href', './index.html')
        // })
      }
    })
  },
  // 商品图片展示的渲染，应该在商品信息渲染之后再次渲染
  img_render() {
    // 商品图片展示slider
    layui.use('carousel', () => {
      const carousel = layui.carousel
      const ins = carousel.render({
        elem: '#slider',
        width: '100%', // 设置容器宽度
        height: '100%',
        arrow: 'always', // 始终显示箭头
        autoplay: 'false',
      })
      // 查询渲染
      ins.reload({
        elem: '#slider',
        width: '100%', // 设置容器宽度
        height: '100%',
        arrow: 'always', // 始终显示箭头
        autoplay: 'false',
      })
    })
  },
  // element的使用，面包屑导航栏
  layui_element() {
    layui.use('element', () => {
      const element = layui.element
    })
  },
  // layer模块的使用
  layui_layer() {
    layui.use('layer', () => {
      const layer = layui.layer
    })
  },
  // 商品数的加减功能
  cart_calc() {
    const max_num = Number($('.stock-box .stock').text())
    let cnt
    // 加
    $('#product-cnt-plus').click(() => {
      cnt = Number($('.product-cnt #count').val())
      if (cnt < max_num)
        $('.product-cnt #count').val(cnt + 1)
    })
    // 减
    $('#product-cnt-reduce').click(() => {
      cnt = Number($('.product-cnt #count').val())
      if (cnt > 1)
        $('.product-cnt #count').val(cnt - 1)
    })
  },
  // 商品图片飞入购物车效果
  async cart_fly_anim() {
    const _this = this

    // 判断是否登录
    const response = await _common_request.ajaxRequest('get_user_info', null)
    // 已登录

    // 动画效果
    $('#form-cart-add').bind('click', function(event) {
      if (response.status == 0) {
        const offset = $('#my-cart').offset()
        // console.log("fly start");
        const addcar = $(this)
        const img = $('.detail-img-box .layui-carousel img').attr('src')
        // console.log(img);

        const flyer = $(`<img class="u-flyer" src="${img}">`)
        flyer.fly({
          start: {
            left: event.pageX, // 开始位置（必填）#fly元素会被设置成position: fixed
            top: event.pageY, // 开始位置（必填）
          },
          end: {
            left: offset.left + 60, // 结束位置（必填） + 50
            top: offset.top + 10, // 结束位置（必填） + 10
            width: 0, // 结束时宽度
            height: 0, // 结束时高度
          },
          onEnd() { // 结束回调
            // console.log("fly end");
          },
        })
        const plus_nums = Number($('#count').val())
      }
      else if (response.status == -1) {
        // 未登录，跳至登录界面还要跳回来
        layer.msg(response.msg, { icon: 2, time: 2000 }, () => {
          $(location).attr('href', `./login?redirect=${location.href}`)
        })
      }
      else {
        // 其他情况
        _common_validate.validate(response, null)
      }
    })
  },
  form_cart_add() {
    layui.use('form', function() {
      const form = layui.form
      const _this = this

      // 登录表单验证
      form.verify({
        // 填写的验证
        verify_cart_product_limit(value, item) {
          const typestr = '商品数量'
          console.log(item)
          if (new RegExp('^\s*$').test(value)) {
            return `${typestr}不能为空！`
          }
        },

      })

      // 监听提交
      form.on('submit(form-cart-add)', async (data) => {
        const res = await _common_request.ajaxRequest('cart_add', data.field)
        // _common_validate.validate(res, null);
        // _search_service.cart_badge_add()

        return false
      })
    })
  },

}

export {
  _product_service,
}
