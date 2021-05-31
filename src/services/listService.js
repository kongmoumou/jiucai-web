// 导入公共模块
import { _common_request, _common_validate } from '~/utils'
// 设置标题
import { _header_service } from '~/services/headerService'

import crumbNavView from '~/pages/list/crumbNavView.html?raw'
import productShowBoxView from '~/pages/list/productShowBoxView.html?raw'

// 搜索参数
const search_params = {
  categoryId: null,
  keyword: null,
  orderBy: null,
  pageSize: null,
  pageNum: null,
}

const _list_service = {

  // 初始化
  async init() {
    // 分类栏的渲染
    this.layui_layer()
    this.list_tree_render()

    const search_form = this.get_search_form()

    // 面包屑导航的渲染,必须在get search form之后
    this.crumb_render()

    // 商品盒子的渲染
    // console.log(this.get_search_form());
    const response = await _common_request.ajaxRequest('list', search_form)
    this.product_show_render(response)

    // 分页的渲染
    this.layui_pages(response)

    // 排序按钮的渲染
    this.list_order()
    this.order_icon_style()
  },
  // 绑定标签
  binding() {

  },
  // 分类栏的渲染
  list_tree_render() {
    const _this = this
    layui.use('tree', async () => {
      const tree = layui.tree

      tree.render({
        elem: '#list-category-tree',
        data: await _this.get_category_tree(0),
        isJump: true,
        showLine: false,
        click(obj) {
          const params = _this.get_search_form()
          params.categoryId = obj.data.id
          params.keyword = ''
          params.pageNum = 1
          // console.log(_this.set_search_url(params));

          window.location.href = _this.set_search_url(params)
        },
      })
    })
  },
  // 面包屑栏的渲染
  crumb_render() {
    const _this = this
    layui.use(['laytpl', 'element'], async() => {
      const laytpl = layui.laytpl
      const element = layui.element

      const category_id = _common_request.getURLParam('categoryId')
      const param = { categoryId: category_id }
      const res_crumb = await _common_request.ajaxRequest('get_category_tree', param)

      // console.log(res_crumb);

      // 设置网页标题
      if (!$.isEmptyObject(search_params.keyword)) {
        _header_service.set_title(search_params.keyword)
      }
      else if ($.isEmptyObject(search_params.keyword) && res_crumb.status == 0) {
        const name = res_crumb.data[res_crumb.data.length - 1].name
        _header_service.set_title(name)
      }

      // 面包屑导航渲染
      const getTpl = crumbNavView
      const view = document.getElementById('crumb-view')
      laytpl(getTpl).render(res_crumb, (html) => {
        view.innerHTML = html
      })

      element.render()

      // 面包屑导航导入元素
      _this.layui_element()
    })
  },
  // 产品展示的渲染
  product_show_render(response) {
    const _this = this
    layui.use('laytpl', () => {
      const laytpl = layui.laytpl

      if (response.status == 0) {
        // 商品盒子view的渲染模板
        const getTpl = productShowBoxView
        const view = document.getElementById('product-wrap-view')
        laytpl(getTpl).render(response, (html) => {
          view.innerHTML = html
        })
      }
      else {
        _common_validate.validate(response)
      }
    })
  },
  // 读取数据
  get_product() {},
  // 商品类别树的转换
  async get_category_tree(parentId_param) {
    const parent_id = { parentId: parentId_param }
    const response = await _common_request.ajaxRequest('get_children_category', parent_id)
    const items = eval('([])')
    if (response.status == 0) {
      const cnt = response.data.length
      // console.log(response.data);

      for (let k = 0; k < cnt; k++) {
        const children_id = { parentId: response.data[k].id }
        const response_children = await _common_request.ajaxRequest('get_children_category', children_id)
        if (response_children.status == 0) {
          const temps1 = this.json_change_name(response_children, 'name', 'title')
          const temps = {
            title: response.data[k].name,
            id: response.data[k].id,
            children: temps1.data,
          }
          items.push(temps)
        }
      }
      // console.log(items);
      return items
    }
    return null
  },
  // json替换key
  json_change_name(json_object, name, replace_name) {
    const json = JSON.parse(JSON.stringify(json_object).replace(new RegExp(name, 'g'), replace_name))
    // console.log(json);
    return json
  },
  // get&set搜索表单
  get_search_form() {
    // 从URL获取参数
    search_params.categoryId = _common_request.getURLParam('categoryId')
    search_params.keyword = _common_request.getURLParam('keyword')
    search_params.orderBy = _common_request.getURLParam('orderBy')
    search_params.pageSize = _common_request.getURLParam('pageSize')
    search_params.pageNum = _common_request.getURLParam('pageNum')
    // console.log(search_params);
    // URL获取的参数为空，则从页面表单中读取
    if (!search_params.categoryId)
      search_params.categoryId = $('#categoryId').val()

    if (!search_params.keyword)
      search_params.keyword = $('#keyword').val()
    else
      $('#keyword').text(search_params.keyword)

    if (!search_params.orderBy)
      search_params.orderBy = $('#orderBy').val()

    if (!search_params.pageSize)
      search_params.pageSize = $('#pageSize').val()

    if (!search_params.pageNum)
      search_params.pageNum = $('#pageNum').val()

    console.log(search_params)
    return search_params
  },
  // 拼接搜索表单信息，参数是否含{categoryId,keyword}
  set_search_url(params) {
    let link = '/list?'
    if (params.categoryId)
      link = `${link}categoryId=${params.categoryId}`

    if (params.keyword)
      link = `${link}&keyword=${params.keyword}`

    if (params.orderBy)
      link = `${link}&orderBy=${params.orderBy}`

    if (params.pageSize)
      link = `${link}&pageSize=${params.pageSize}`

    if (params.pageNum)
      link = `${link}&pageNum=${params.pageNum}`

    return link
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
  // lay pages模块的使用
  layui_pages(params) {
    const _this = this
    layui.use(['laypage'], () => {
      const laypage = layui.laypage

      // 分页功能
      laypage.render({
        elem: 'page-controller-view',
        count: params.data.total,
        limit: params.data.pageSize,
        layout: ['prev', 'page', 'next', 'skip', 'limit'],
        theme: 'var(--jiucai-green)',
        async jump(obj, first) {
          // console.log("***************");
          // console.log(obj)
          // console.log("***************");

          // 首次不执行
          if (!first) {
            // 下一页或上一页的载入渲染
            const search_data = _this.get_search_form()
            search_data.pageNum = obj.curr
            search_data.pageSize = obj.limit
            const response = await _common_request.ajaxRequest('list', search_data)
            _this.product_show_render(response)
          }
        },
      })
    })
  },
  // 依据排序设置按钮
  list_order() {
    const _this = this

    const btn_all = $('#list-order').find('.order-itme').find('.layui-btn')
    btn_all.each(function(index) {
      const type = $(this).attr('name')
      const order_btn = $(this)
      let order_name = null
      let order_string = null
      // console.log("**********");
      // console.log(type);

      if (type == 'price') {
        // 根据价格排序
        order_btn.bind('click', () => {
          // console.log("**********");
          console.log('price')
          // 重置所有按钮样式
          btn_all.each(function() {
            $(this).find('#order_icon').attr('style', 'display: none;')
          })
          // 显示价格的样式
          order_btn.find('#order_icon').attr('style', 'display: inline-block;')
          // 如果降序
          if (order_btn.find('#order_icon').hasClass('icon-xia-1')) {
            order_btn.find('#order_icon').removeClass('icon-xia-1')
            order_btn.find('#order_icon').addClass('icon-shang-1')
            order_string = 'asc'
          }
          else {
            order_btn.find('#order_icon').removeClass('icon-shang-1')
            order_btn.find('#order_icon').addClass('icon-xia-1')
            order_string = 'desc'
          }
          order_name = `price_${order_string}`
          // 设置搜索的表单
          // console.log("**********");
          console.log($('#orderBy').val(order_name))
          search_params.orderBy = order_name
          search_params.pageNum = 1
          _this.refresh_page()
        })
      }
      else if (type == 'stock') {
        // 根据库存排序
        order_btn.bind('click', () => {
          // console.log("**********");
          // console.log("stock");
          btn_all.each(function() {
            $(this).find('#order_icon').attr('style', 'display: none;')
          })
          // 显示价格的样式
          order_btn.find('#order_icon').attr('style', 'display: inline-block;')
          // 如果降序
          if (order_btn.find('#order_icon').hasClass('icon-xia-1')) {
            order_btn.find('#order_icon').removeClass('icon-xia-1')
            order_btn.find('#order_icon').addClass('icon-shang-1')
            order_string = 'asc'
          }
          else {
            order_btn.find('#order_icon').removeClass('icon-shang-1')
            order_btn.find('#order_icon').addClass('icon-xia-1')
            order_string = 'desc'
          }
          order_name = `stock_${order_string}`
          // 设置搜索的表单
          search_params.orderBy = order_name
          search_params.pageNum = 1
          _this.refresh_page()
        })
      }
    })
  },
  order_icon_style() {
    // 刷新页面时，根据表单来重新设置按钮样式
    // var btn_icon = $("#list-order").find(".order-itme");
    $('#list-order').find('.order-itme').find('.layui-btn').each(function() {
      $(this).find('#order_icon').attr('style', 'display: none;')
    })
    // 判断类型
    if (search_params.orderBy == 'price_desc') {
      $('#list-order').find('.order-itme').find('[name=\'price\']').find('#order_icon').attr('style', 'display: inline-block;')
      $('#list-order').find('.order-itme').find('[name=\'price\']').find('#order_icon').removeClass('icon-shang-1')
      $('#list-order').find('.order-itme').find('[name=\'price\']').find('#order_icon').addClass('icon-xia-1')
    }
    else if (search_params.orderBy == 'price_asc') {
      $('#list-order').find('.order-itme').find('[name=\'price\']').find('#order_icon').attr('style', 'display: inline-block;')
      $('#list-order').find('.order-itme').find('[name=\'price\']').find('#order_icon').removeClass('icon-xia-1')
      $('#list-order').find('.order-itme').find('[name=\'price\']').find('#order_icon').addClass('icon-shang-1')
    }
    else if (search_params.orderBy == 'stock_desc') {
      $('#list-order').find('.order-itme').find('[name=\'stock\']').find('#order_icon').attr('style', 'display: inline-block;')
      $('#list-order').find('.order-itme').find('[name=\'stock\']').find('#order_icon').removeClass('icon-shang-1')
      $('#list-order').find('.order-itme').find('[name=\'stock\']').find('#order_icon').addClass('icon-xia-1')
    }
    else if (search_params.orderBy == 'stock_asc') {
      $('#list-order').find('.order-itme').find('[name=\'stock\']').find('#order_icon').attr('style', 'display: inline-block;')
      $('#list-order').find('.order-itme').find('[name=\'stock\']').find('#order_icon').removeClass('icon-xia-1')
      $('#list-order').find('.order-itme').find('[name=\'stock\']').find('#order_icon').addClass('icon-shang-1')
    }
  },
  // 根据表单刷新页面
  refresh_page() {
    const link = `/list?categoryId=${search_params.categoryId}&keyword=${search_params.keyword}&orderBy=${search_params.orderBy}&pageSize=${search_params.pageSize}&pageNum=${search_params.pageNum}`
    $(location).attr('href', link)
  },

}

export {
  _list_service,
}
