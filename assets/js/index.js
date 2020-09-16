$(function () {
  //渲染用户信息
  getUserInfo()

  function getUserInfo() {
    $.get('/my/userinfo', function (res) {
      if (res.status === 1) {
        return
      }
      var resname = res.data.nickname || res.data.username
      $('#welcome').html('欢迎' + resname)
      if (res.data.user_pic) {
        $('.layui-nav-img').attr('src', res.data.user_pic).show()
        $('.text-avatar').hide()
      } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(resname[0].toUpperCase())
      }
    })
  }
  window.getUserInfo = getUserInfo
  $('#btn-logout').click(function () {
    var index = layer.confirm('确定退出？', {
      icon:3,
      btn: ['确定', '取消'] //可以无限个按钮
    }, function () {
      //按钮【按钮一】的回调
      window.localStorage.removeItem('token')
      window.location.href = '../../login.html'
    });
  })
})