$(function () {
  //调用getUserInfo获取用户信息
  getUserInfo()
})
// 退出点击事件
$('#btnLoglout').on('click', function () {
  //eg1
  layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
    //do something =
    // 1. 清除本地储存中的 token
    localStorage.removeItem('token')
    // 2. 重新跳转到登录页面
    location.href = '/login.html'
    // 关闭 confirm 询问框
    layer.close(index)
  })
})
// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // header就是请求头配置对象
    header: {},
    success: function (res) {
      if (res.status !== 0) return /* layer.message('请求失败') */
      //   console.log(res.data)
      // 调用renderAvatar渲染用户的头像
      renderAvatar(res.data)
    },
    // 无论成功还是失败，最终都会调用complete回调函数
    complete: function (res) {
      console.log(res.responseText)
      // 在complete回调函数中,可以使用res.responseJSON拿到服务器响应回来的数据
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message === '身份认证失败！'
      ) {
        // 1. 清除本地储存中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
      }
    },
  })
}
// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  let name = user.nickname || user.username
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp,&nbsp' + name)
  // 3. 按需渲染
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img').attr('src', user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
// 更新用户信息
function updateInfo() {}