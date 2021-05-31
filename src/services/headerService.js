const _header_service = {
  // 初始化
  init() {

  },
  // 绑定标签
  binding() {

  },
  title_font: '韭菜商城',
  // 设置标题
  set_title(title) {
    document.title = `${this.title_font} - ${title}`
  },
  // 设置副标题
  set_subtitle(title) {
    $('#header-subtitle').text(title)
  },
}

export {
  _header_service,
}
