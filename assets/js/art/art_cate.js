$(function () {
  //获取文章
  getCate()

  function getCate() {
    $.get('/my/article/cates', function (res) {
      var str = template('tmp', res)
      $('tbody').html(str)
    })
  }
  //添加类别
  $('#addBtn').on('click', function (e) {
    var strAddHtml = $('#add').html()
    indexAdd = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: strAddHtml,
    })
  })
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault();
    // console.log($(this).serialize());
    $.post('/my/article/addcates', $(this).serialize(), res => {
      if (res.status === 0) {
        getCate()
        layer.close(indexAdd)
        layer.msg(res.message)
      } else {}
    })
  })
  //编辑类别
  $('tbody').on('click', '.btn-edit', function (e) {
    var str = $('#edit').html()
    indexEdit = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '编辑文章分类',
      content: str,
    })
    var Id = $(this).attr('data-id')
    $.get(`/my/article/cates/${Id}`, res => {
      if (res.status === 0) {
        layui.form.val('editForm', res.data)
      }
    })
    $('body').on('submit', '#editForm', function (e) {
      e.preventDefault()
      $.post(`/my/article/updatecate`, $(this).serialize(), res => {
        // console.log(res);
        if (res.status === 0) {
          getCate()
          layer.close(indexEdit)
          layer.msg(res.message)
        }
      })
    })
  })
  // 删除
  $('tbody').on('click', '.btn-delete', function (e) {
    var Id = $(this).attr('data-id');
    var indexDelete = layer.confirm('确定删除?', {
        icon: 3,
        btn: ['确定','取消'] //可以无限个按钮
      },
      function () {
        //按钮【按钮一】的回调
        $.get(`/my/article/deletecate/${Id}`, res => {
          // console.log(res);
          if (res.status === 0) {
            getCate()
            layer.msg(res.message)
            layer.close(indexDelete)
          }
        })
      })
  })
})