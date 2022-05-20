// 发送请求时先调用这个函数
$.ajaxPrefilter(function (options) {
  //   console.log(options.url)
  // 发起请求前统一拼接根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
  //   console.log(options.url)
})
