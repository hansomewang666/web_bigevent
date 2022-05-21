// $(function () {
// 点击‘去注册账号’的链接
$('#link_reg').on('click', function () {
  $('.login-box').hide()
  $('.reg-box').show()
})
// 点击'去登录'的链接
$('#link_login').on('click', function () {
  $('.login-box').show()
  $('.reg-box').hide()
})

// laryui 中获取 form 对象
let form = layui.form
let layer = layui.layer
// 通过form.verify()函数自定义检验规则
form.verify({
  // 自定义了一个叫做pwd的密码校验规则
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  repwd: function (value) {
    // 通过形参拿到确认密码框中的内容
    // 需要再次拿到密码框的内容进行全等判断
    // 判断失败return错误消息
    let pwd = $('.reg-box [name=password]').val()
    if (pwd !== value) {
      return '两次密码不一致'
    }
  },
})
// 监听注册表单提交事件
$('#form_reg').on('submit', function (e) {
  // 第一件事情阻止默认提交行为
  e.preventDefault()
  let str = $('#form_reg').serialize()
  // 发起Ajax post请求
  $.post('/api/reguser', str, function (res) {
    // console.log(res)
    return layer.msg(res.message)
  })
  layer.msg('注册成功，请登录')
  // 模拟点击
  $('#link_login').click()
})

// 监听注册表单提交事件
$('#form_login').on('submit', function (e) {
  // 住址默认行为
  e.preventDefault()
  // 提交POST请求
  let data = $('#form_login').serialize()
  // console.log(data)
  $.ajax({
    method: 'POST',
    url: '/api/login',
    data: data,
    success: function (res) {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg('登陆失败！')
      }
      layer.msg('登录成功')
      // 登陆成功得到token字符串, 保存到localStorage中
      localStorage.setItem('token', res.token)
      // console.log(res.token)
      location.href = '/index.html'
    },
  })
})
