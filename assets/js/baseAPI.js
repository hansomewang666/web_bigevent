// 发送请求时先调用这个函数
$.ajaxPrefilter(function (options) {
  //   console.log(options.url)
  // 发起请求前统一拼接根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
  //   console.log(options.url)
  // 统一为有权限对的接口设置 headers 请求头
  if (options.url.indexOf('/my') !== -1) {
    /* console.log(localStorage.getItem('token')) */
    options.headers = {
      Authorization: localStorage.getItem('token') || '',
    }
  }
})
