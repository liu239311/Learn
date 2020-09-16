$(function () {
  // console.log(window.location.href);
  let q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: $('[name=cate_id]').val(),
    state: $('[name=state]').val()
  }
  getList()

  function getList() {
    $.get(`/my/article/list`, q, function (res) {
      // console.log(res);
      if (res.status === 0) {
        // console.log(res.data[])
        var strHtml = template('tpl-table', res)
        $('tbody').html(strHtml)
        // 调用渲染分页
        // console.log(res.total);
        renderPage(res.total)
      }
    })
  }
  template.defaults.imports.formatDate = function (olddate) {
    // console.log(olddate) // 2020-09-13 01:45:39.448
    // 处理逻辑
    // console.log(moment)
    var timenew = moment(olddate).format('YYYY-MM-DD hh:mm:ss');
    return timenew
  }
  // 筛选
  $('#form-search').submit(function (e) {
    e.preventDefault()
    q.cate_id = $('[name=cate_id]').val()
    q.state = $('[name=state]').val()
    getList()
  })
  // 时间过滤器
  initCate()

  //渲染下拉框模板
  function initCate() {
    $.get(`/my/article/cates`, res => {
      if (res.status === 0) {
        // console.log(res)
        var strHtml = template('tpl-cate', res)
        $('#sct-cate').html(strHtml)
        // 手动让form重新渲染
        layui.form.render()
      }
    })
  }

  //渲染分页器
  function renderPage(total) {
    layui.use('laypage', function () {
      var laypage = layui.laypage
      laypage.render({
        elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        curr: q.pagenum, // 当前页码
        limit: q.pagesize, //  每页条数
        limits: [2, 3, 5, 10], // 切换每页条数pagesize
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        // 情况1：默认第一次时调用！！！！！！！
        // 情况2：切换页码时，调用jump函数
        jump: function (obj, first) {
          //首次不执行
          if (!first) {
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            getList()
          } else {}
        },
      })
    })
  }
  // 删除
  $('tbody').on('click', '.delete', function (e) {
    var Id = $(this).attr('data-id');
    var length = $(this).length
    var indexDelete = layer.confirm('确定删除?', {
        icon: 3,
        btn: ['确定', '取消'] //可以无限个按钮
      },
      function () {
        //按钮【按钮一】的回调
        $.get(`/my/article/delete/${Id}`, res => {
          // console.log(res);
          if (res.status === 0) {
            if (length === 1) {
              q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
            }
            getList()
            layer.msg(res.message)
            layer.close(indexDelete)
          }
        })
      })
  })
  // 编辑
  $('tbody').on('click', '.edit', function (e) {
    var Id = $(this).attr('data-id');
    window.location.href = `../art/art_pub.html?${Id}`
  })
})