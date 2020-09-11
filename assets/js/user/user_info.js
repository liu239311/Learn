$(function () {
  // console.log($('.layui-form input[name=username]'));
  // $('.layui-form input[name=username]')
  layui.form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1~6个字符之间'
      }
    },
  })
  initUserInfo()

  function initUserInfo() {
    // 获取登录用户信息
    $.get('/my/userinfo', function (res) {
      console.log(res)
      if (res.status === 0) {
        // 给表单赋值
        layui.form.val('formInfo', res.data)
      } else {}
    })
  }
  //点击重置 重置表单
  $('#btn-reset').click(function (e) {
    e.preventDefault()
    initUserInfo()
  })
  //点击提交发送ajax 更新用户数据
  $('#formInfo').submit(function (e) {
    e.preventDefault()
    $.post('/my/userinfo', $(this).serialize(), function (res) {
      if (res.status === 0) {
        // console.log(window.parent)
        window.parent.getUserInfo()
        // console.log(res);
        layer.msg(res.message)
      }
    })
  })
})