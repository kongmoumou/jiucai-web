// 导入公共模块
import { reactive } from 'vue'
import { _common_request } from '~/utils'

export const _index_service = {
  useData(parentId_param) {
    const data = reactive({
      parents: null,
      childrens: [],
      items: [],
    })

    const _this = this
    // layui模板渲染

    // 调用layui需要的模块
    _this.layui_layer()

    layui.use('laytpl', async() => {
      const laytpl = layui.laytpl
      // 对商品页面进行渲染
      const parent_id = { parentId: parentId_param }
      const response = await _common_request.ajaxRequest('get_children_category', parent_id)
      // console.log(response);

      // 商品存在才进行渲染
      if (response.status == -999) {
        // layer.msg(response.msg + " 3秒后返回主页。", { icon: 7, time: 3000 }, function() {
        //     $(location).attr('href', './index.html');
        // });
      }
      // -1商品不存在，则返回主页
      else if (response.status == -1) {
        // layer.msg(response.msg + " 3秒后返回主页。", { icon: 2, time: 3000 }, function() {
        //     $(location).attr('href', './index.html');
        // });
      }
      // 1失败
      else if (response.status == 1) {
        // layer.msg(response.msg + " 3秒后返回主页。", { icon: 3, time: 3000 }, function() {
        //     $(location).attr('href', './index.html');
        // });
      }
      // 0，商品存在则进行渲染
      else if (response.status == 0) {
        // console.log(response);
        // 大类
        data.parents = response

        // floor all的渲染
        // var getTpl = floor_all_view
        // var view = document.getElementById('floor-all-view')
        // laytpl(getTpl).render(response, (html) => {
        //   view.innerHTML = html
        // })

        const cnt = response.data.length
        for (let k = 0; k < cnt; k++) {
          const children_id = { parentId: response.data[k].id }
          const response_children = await _common_request.ajaxRequest('get_children_category', children_id)

          data.childrens[k] = response_children

          const category_cnt = response_children.data.length
          const temp = '[]'
          // const product_items = eval(`(${temp})`)
          const product_items = []
          // console.log(category_cnt);

          if (category_cnt > 0) {
            // product list VO
            for (let i = 0; i < category_cnt; i++) {
              const category_id = { categoryId: response_children.data[i].id }

              const response_category = await _common_request.ajaxRequest('list', category_id)
              // console.log(response_category);

              // 该分类有商品
              if (response_category.status == 0) {
                const list_cnt = response_category.data.list.length
                // console.log(list_cnt);
                product_items.push(response_category.data.list)
              }
              else {
                product_items.push(null)
              }
              // console.log({ categoryId: response.data[i].categoryId });
            }

            data.items[k] = product_items
          }
        }
      }
      // 其他情况
      else {
        // layer.msg(response.msg + " Response code:" + response.status + "。" + " 3秒后返回主页。", { icon: 3, time: 3000 }, function() {
        //     $(location).attr('href', './index.html');
        // });
      }

      // 面包屑导航渲染
      _this.layui_element()
      // 图片slider渲染
      _this.img_render()
      // layer渲染
      _this.layui_layer()
    })

    return data
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
  // element的使用，Tabs渲染
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
  back2top() {
    // 拖动滚动条或滚动鼠标轮
    window.onscroll = function() {
      if (document.body.scrollTop || document.documentElement.scrollTop > 0)
        document.getElementById('rTop').style.display = 'block'
      else
        document.getElementById('rTop').style.display = 'none'
    }

    // 点击“回到顶部”按钮
    $('#rTop').on('click', () => {
      window.scrollTo('0', '0')
      document.getElementById('rTop').style.display = 'none'
    })
  },

}
