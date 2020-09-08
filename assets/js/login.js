$(function () {
  $('.login a').click(function () {
    $('.login').hide().next().show()
  })
  // 点击去登录
  $('.register a').click(function () {
    $('.register').hide().prev().show()
  })
  // // console.log($('.register form'));
  $('.register form').submit(function (e) {
    // e.preventDefault()
    var data = {
      username: $('.register form input[name=username]'),
      password: $('.register form input[name=password]')
    }
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      data,
      success: function (res) {
        console.log(res);
      },
    })
  })
})