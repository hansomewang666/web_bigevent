$(function () {
  let layer = layui.layer
  // 获取文章分类的猎豹数据
  initArtCateList()
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) return layer.msg('获取文章分类列表失败！')
        // 渲染表格
        let htmlTable = template('tpl-table', res)
        // 追加表格内容
        $('#content').html(htmlTable)
      },
    })
  }
  let indexAdd = null
  // 为添加类别按钮绑定点击事件
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    })
  })
  // 通过代理的形式，为form-add 表单绑定submit事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      },
    })
  })
  // 通过代理的形式，为btn-edit 表单绑定点击事件
  let indexEdit = null
  let data = null
  $('tbody').on('click', '.btn-edit', function (e) {
    e.preventDefault()
    // 弹出一个修改分类的层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '编辑文章分类',
      content: $('#dialog-edit').html(),
    })
    let id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('请求分类列表失败！')
        }
        data = res.data.Id
      },
    })
  })

  // 通过代理的形式，为form-edit 表单绑定submit事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: {
        Id: data,
        name: $('#name').val(),
        alias: $('#alias').val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('编辑分类失败！')
        }
        initArtCateList()
        layer.msg('编辑分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexEdit)
      },
    })
  })

  // 通过代理的形式，为btn-delete 表单绑定点击事件
  let indexDelete = null
  $('tbody').on('click', '.btn-delete', function (e) {
    e.preventDefault()
    let id = $(this).attr('data-id')
    // 弹出一个修改分类的层
    indexDelete = layer.confirm(
      '确认删除?',
      { icon: 3, title: '提示' },
      function (index) {
        //do something
        $.ajax({
          method: 'GET',
          url: '/my/article/deletecate/' + id,
          success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
              return layer.msg('删除分类列表失败！')
            }
            initArtCateList()
            // data = res.data.Id
          },
        })
        layer.close(index)
      }
    )
  })
})
