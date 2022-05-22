$(function () {
  let form = layui.form
  let layer = layui.layer

  // 验证表单框
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1 ~ 6个字符之间!'
      }
    },
  })
  initUserInfo()
  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          return layer.msg('获取信息失败!')
        }
        // 调用form.val() 快速为表单赋值
        form.val('formUserInfo', res.data)
      },
    })
  }
  //重置表单数据
  $('#btnReset').on('click', function (e) {
    //阻止重置按钮清空所有表单数据默认行为
    e.preventDefault()
    // 重新调用获取用户信息函数
    initUserInfo()
  })
  // 提交表单数据
  $('.layui-form').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault()
    // 发起post请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新信息失败!')
        }
        layer.msg('更新信息成功!')
        // 调用父页面中的方法,重新渲染用户名和头像
        window.parent.getUserInfo()
      },
    })
  })
})
