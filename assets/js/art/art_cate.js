$(function () {
  initArticleList();

  function initArticleList() {
    $.get('/my/article/cates', data => {
      // console.log(data);
      if (data.status === 0) {
        var list = template('tmp', data)
        $('tbody').html(list)
      } else {}
    })
  }
  //添加
  $('#addBtn').click(function (e) {
    e.preventDefault()
    var strAddHtml = $('#add').html()
    indexAdd = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: strAddHtml,
    })
  })
  $('body').on('submit', '#addForm', function(e){
    e.preventDefault();
    console.log($(this).serialize());
    $.post('/my/article/addcates', $(this).serialize(),  res => {
      if (res.status === 0) {
        initArticleList()
        layer.close(indexAdd)
        layer.msg(res.message)
      } else{}
    })
  })
  //编辑
  $('tbody').on('click', '.btn-edit', function (e) {
    // console.log($(this));
    e.preventDefault()
    var strEditHtml = $('#edit').html()
    indexEdit = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: strEditHtml,
    })
    // 获取button的data-Id属性值
    var Id = $(this).attr('data-id')
    $.get(`/my/article/cates/${Id}`, res => {
      if (res.status === 0) {
        layui.form.val('editForm', res.data)
      }
    })
  })
  //  通过代理，为表单绑定事件
  $('body').on('submit', '#editForm', function (e) {
    e.preventDefault()
    $.post('/my/article/updatecate', $(this).serialize(), res => {
      // console.log(res)
      if (res.status === 0) {
        initArticleList()
        layer.close(indexEdit)
      }
    })
  })

  //删除
  $('tbody').on('click', '.btn-delete', function (e) {
    // console.log($(this));
    e.preventDefault()
    var Id = $(this).attr('data-id')
    layer.confirm('确定删除?', {
      icon: 3,
      title: '提示'
    }, function () {
      $.get(`/my/article/deletecate/${Id}`, res => {
        if(res.status === 0) {
          layer.msg(res.message)
          initArticleList();
        } else {
          layer.msg('删除文章分类失败!')
        }
      })
    })
  })
})