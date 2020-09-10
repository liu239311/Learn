$(function () {
  $.get('/my/userinfo', function (res) {
    console.log(res);
    var name = res.data.nickname || res.data.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + res.data.username)
    // $('.text-avatar').html(name[0].toUpperCase())
    if (res.data.user_pic) {
      $('.layui-nav-img').attr('src', res.data.user_pic).show()
      $('.text-avatar').hide()
    } else {
      var first = name[0].toUpperCase()
      $('.layui-nav-img').hide()
      $('.text-avatar').html(first).show()
    }
  })
  $('#btn-logout').click(function () {
    var dialog = layer.open({
      title: '提示',
      icon: 3,
      content: '确定退出登录?',
      btn: ['确定', '取消'], //可以无限个按钮,
      btn1: function (index, layero) {
        // console.log(index,layero);
        localStorage.removeItem('token')
        location.href = '../../login.html'
      },
      btn2: function () {
        layer.close(dialog);
      }
    });
  })
})