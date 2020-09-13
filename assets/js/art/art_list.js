$(function () {
  // 设置表格数据请求的查询参数
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: '',
  }
  initTable()

  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        console.log(res)
        if (res.status === 0) {
          var strHTML = template('tpl-table', res)
          $('tbody').html(strHTML)
        } else {
          layer.msg(res.message)
        }
      },
    })
  }
})