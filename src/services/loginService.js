// 导入公共模块
import { _common_request, _common_validate } from '~/utils'

export const _login_service = {
  // 初始化
  init() {
    this.isLogin()
  },
  // 绑定事件处理
  binding() {
    this.logout()
  },
  // 判断是否登录
  async isLogin() {
    const response = await _common_request.ajaxRequest('get_user_info', null)

    // 屏蔽部分提示
    // 请求失败
    layui.use(['layer', 'form'], () => {
      const layer = layui.layer

      if (response.status == -999) {
        layer.msg(response.msg, { icon: 7, time: 2000 })
      }
      // 登录-1失败
      else if (response.status == -1) {
        // layer.msg(response.msg, { icon: 2, time: 2000});
      }
      // 登录1失败
      else if (response.status == 1) {
        // layer.msg(response.msg, { icon: 3, time: 2000});
      }
      // 登录0成功
      else if (response.status == 0) {
        // TODO: 登录成功操作
      }
      // 其他情况
      else {
        layer.msg(`${response.msg} Response code:${response.status}。`, { icon: 3, time: 2000 })
      }
    })
  },
  // 退出登录
  logout() {
    $('#logout-a').on('click', () => {
      const res = _common_request.ajaxRequest('logout', null)
      console.log(res)
      _common_validate.validate(res, 'index')
    })
  },
  // 登录表单
  login_form_fn() {
    const _this = this
    layui.use('form', () => {
      const form = layui.form

      // 登录表单验证
      form.verify({
        // 用户名验证
        verify_login(value, item) {
          // 判断是账号还是密码
          let typestr = '用户名'
          if (item.name == 'username')
            typestr = '用户名'
          else
            typestr = '密码'

          if (new RegExp('^\s*$').test(value))
            return `${typestr}不能为空！`

          // 判断是账号还是密码
          if (item.name == 'username') {
            if (!/^[\S]{4,20}$/.test(value))
              return `${typestr}必须4到16且不能出现空格！`
          }
          else if (item.name == 'password') {
            if (!/^[\S]{4,20}$/.test(value))
              return `${typestr}必须4到16且不能出现空格！`
          }
          if (!/^[a-zA-Z0-9_\u4E00-\u9FA5\\s·]+$/.test(value))
            return `${typestr}不能含有特殊字符！`

          if (/(^\_)|(\__)|(\_+$)/.test(value))
            return `${typestr}首尾不能出现下划线'_'！`

          if (/^\d+\d+\d$/.test(value))
            return `${typestr}不能全为数字！`
        },

      })

      // 监听提交的表单
      form.on('submit(form-login)', (data) => {
        _common_request.ajaxRequest('login', data.field).then((res) => {
          console.log(_this.get_redirect())
          if (_this.get_redirect() != null)
            _common_validate.validate(res, _this.get_redirect())
          else
            _common_validate.validate(res, 'index')
        })

        // 必须设置为false，否则会提交两次表单
        return false
      })
    })
  },
  get_redirect() {
    const redirect = _common_request.getURLParam('redirect')
    return redirect
  },
}
