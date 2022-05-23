$(function () {
  var layer = layui.layer
  var form = layui.form

  initCate()
  // 初始化富文本编辑器
  initEditor()

  // 定义加载文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('初始化文章分类失败！')
        }
        // 调用模板引擎，渲染分类的下拉菜单
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 一定要记得调用 form.render() 方法
        form.render()
      },
    })
  }
  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)
  // 选择封面绑定点击事件触发隐藏文件筐
  $('#btn_file').on('click', function () {
    $('#coverFile').click()
  })

  // 监听coverFile的change事件，获取用户选择的文件列表
  $('#coverFile').on('change', function (e) {
    // 获取文件列表数
    let files = e.target.files
    // 判断用户是否选择了文件
    if (files.length === 0) return

    // 根据文件创建对应的URL地址
    let newImgURL = URL.createObjectURL(files[0])
    // 为裁剪区直接设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 定义文章的发布状态
  let art_state = '已发布'

  // 为存为草稿的按钮, 绑定点击事件处理函数
  $('#btnSave2').on('click', function () {
    art_state = '草稿'
  })

  // 为表单绑定submit提交事件
  $('#form-pub').on('submit', function (e) {
    e.preventDefault()
    // 基于form表单，快速创建一个new FormData对象
    let fd = new FormData($(this)[0])
    // console.log(fd)
    fd.forEach((v, i) => {
      console.log(v, i)
    })
    // 3. 将文章的状态存到fd中
    fd.append('state', art_state)
    // console.log(fd)

    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象,储存到fd中
        fd.append('cover_img', blob)
        // 6. 发起ajax数据请求
        publishArticle(fd)
      })
  })

  // 发布文章的方法
  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      // 如果向服务器提交的是 FormData 格式的数据必须两个配置项
      contentType: false,
      processData: false,
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          return layer.msg('发布文章失败!')
        }
        layer.msg('发布文章成功!')
        // 发布文章成功跳转
        location.href = '/article/art_list.html'
      },
    })
  }
})
