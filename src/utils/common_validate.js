function getRedirectUrl(url) {
  const request = {
    index: {
      name: '主页',
      url: 'index',
    },
    login: {
      name: '登录页面',
      url: 'login',
    },
  }
  // 自定义跳转页面
  if (_common_validate.isEmpty(request[url])) {
    const link = {
      name: '原页面',
      url,
    }
    return link
  }
  else {
    return request[url]
  }
}

export const _common_validate = {
  // 重新安排一下后端响应码
  validate(response, redirect_path) {
    // 请求失败
    if (response.status == -999) {
      layer.msg(response.msg, { icon: 7, time: 2000 })
    }
    // -1失败
    else if (response.status == -1) {
      layer.msg(response.msg, { icon: 2, time: 2000 })
    }
    // 1失败
    else if (response.status == 1) {
      layer.msg(response.msg, { icon: 3, time: 2000 })
    }
    // 0成功
    else if (response.status == 0) {
      // 不显示消息的操作

      // 网址跳转
      if (redirect_path != null) {
        layer.msg(
          `${response.msg}5秒后跳转到${getRedirectUrl(redirect_path).name}。`,
          { icon: 1, time: 5000, shade: 0.4 },
          () => {
            $(location).attr('href', getRedirectUrl(redirect_path).url)
          },
        )
      }
      else {
        layer.msg(response.msg, { icon: 1, time: 2000 })
      }
    }
    // 其他情况
    else {
      layer.msg(`${response.msg} Response code:${response.status}。`, {
        icon: 3,
        time: 2000,
        shade: 0.4,
      })
    }
  },
  // 判断对象是否为空
  isEmpty(obj) {
    return !obj
  },
}
