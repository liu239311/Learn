$(function () {
  // 获取用户信息
  // /my/userinfo /  header / ls中的token

  //   获取登录后保存在本地的token
  //   var token = window.localStorage.getItem('token') || ''

  getUserInfo()

  function getUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      success: function (res) {
        if (res.status === 1) {
          return
        }
        var resname = res.data.nickname || res.data.username
        $('#welcome').html(resname)
        if (res.data.user_pic) {
          $('.layui-nav-img').attr('src', res.data.user_pic).show()
          $('.text-avatar').hide()
        } else {
          $('.layui-nav-img').hide()
          $('.text-avatar').html(resname[0].toUpperCase())
        }
      },
    })
  }
  window.getUserInfo = getUserInfo
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
      }
    });
  })
})