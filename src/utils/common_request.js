import $ from 'jquery'

export const _common_request = {

  // 请求URL及method的配置
  ajaxRequest(routhing, obj) {
    const links = this.getRequestUrl(routhing)
    let result = {}
    return new Promise((resolve, reject) => {
      $.ajax({
        // 请求方法，默认为get
        type: links.method || 'get',
        url: links.url,
        data: obj || '',
        dataType: 'json',
        cache: true,
        // 允许跨域携带cookie
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
        success(data) {
          result = data
          resolve(data)
        },
        error(xhr, textStatus, errorThrown) {
          result = { status: '-999', msg: `请求失败，状态码为：${xhr.status}` }
          reject(result)
        },
      })
    })
  },
  // 获取url中的参数
  getURLParam(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
    const result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  parseUrlParam(URL) {

  },
  // 后端API配置
  getRequestUrl(routhing) {
    // 请求域名
    // TODO: update
    const host = import.meta.env.DEV ? `${location.origin}/api` : `${location.origin}/api`
    const request = {
      // 登录
      login: {
        method: 'post',
        url: `${host}/users/login`,
      },
      // 登出
      logout: {
        method: 'get',
        url: `${host}/users/logout`,
      },
      // 获取用户信息
      get_user_info: {
        method: 'get',
        url: `${host}/users/get_user_info`,
      },
      // 用户注册
      register: {
        method: 'post',
        url: `${host}/users/register`,
      },
      // 找回密码
      recover_step1: {
        method: 'get',
        url: `${host}/users/forget_password`,
      },
      recover_step2: {
        method: 'post',
        url: `${host}/users/forget_password`,
      },
      recover_step3: {
        method: 'post',
        url: `${host}/users/reset_password_by_token`,
      },
      // 更新用户资料
      update_userinfo: {
        method: 'post',
        url: `${host}/users/update_user_info`,
      },
      // 修改密码
      reset_password: {
        method: 'post',
        url: `${host}/users/reset_password`,
      },
      // 获取商品详细信息
      get_product: {
        method: 'get',
        url: `${host}/product/get_product`,
      },
      // 获取单个商品的分类
      get_category: {
        method: 'get',
        url: `${host}/category/get_category`,
      },
      // 获取单个商品的分类
      get_category_tree: {
        method: 'get',
        url: `${host}/category/get_category_tree`,
      },
      // 搜索相关的商品信息列表
      list: {
        method: 'get',
        url: `${host}/product/list`,
      },
      // 查询某种商品父类的子类（平级）
      get_children_category: {
        method: 'get',
        url: `${host}/category/get_children_category`,
      },
      // 获取购物车商品列表
      cart_list: {
        method: 'get',
        url: `${host}/cart/list_cart`,
      },
      // 增加或减少购物车的商品数量
      cart_add: {
        method: 'post',
        url: `${host}/cart/add_cart`,
      },
      // 更新购物车某个商品的信息
      cart_update: {
        method: 'post',
        url: `${host}/cart/update_cart`,
      },
      // 增加选中某个商品
      cart_select: {
        method: 'post',
        url: `${host}/cart/select`,
      },
      // 取消选中某个商品
      cart_unselect: {
        method: 'post',
        url: `${host}/cart/unselect`,
      },
      // 选择所有商品
      cart_select_all: {
        method: 'get',
        url: `${host}/cart/select_all`,
      },
      // 删除某件商品
      cart_unselect_all: {
        method: 'get',
        url: `${host}/cart/unselect_all`,
      },
      // 取消选择所有商品
      cart_delete_product: {
        method: 'post',
        url: `${host}/cart/delete_product`,
      },
      // 获取商品的数量
      cart_get_count: {
        method: 'get',
        url: `${host}/cart/get_cart_product_count`,
      },
      // 增加收货地址
      create_shipping: {
        method: 'post',
        url: `${host}/shipping/create`,
      },
      // 删除收货地址
      delete_shipping: {
        method: 'post',
        url: `${host}/shipping/delete`,
      },
      // 修改收货地址
      update_shipping: {
        method: 'post',
        url: `${host}/shipping/update`,
      },
      // 获取收货地址列表
      list_shipping: {
        method: 'get',
        url: `${host}/shipping/list`,
      },
      // 创建订单
      create_order: {
        method: 'get',
        url: `${host}/order/create_order`,
      },
      // 获取订单详情
      get_order_detail: {
        method: 'get',
        url: `${host}/order/get_order_detail`,
      },
      // 获取订单列表
      get_order_list: {
        method: 'get',
        url: `${host}/order/get_order_list`,
      },
      // 取消订单
      cancel_order: {
        method: 'get',
        url: `${host}/order/cancel_order`,
      },
      // alipay
      pay_alipay: {
        method: 'post',
        url: `${host}/pay/alipay`,
      },
    }
    return request[routhing]
  },
}
