$(function () {
  $('.login a').click(function () {
    $('.login').hide().next().show()
  })
  $('.register a').click(function () {
    $('.register').hide().prev().show()
  })
  var form = layui.form
  form.verify({
    password: function (value) {
      // value表示使用验证规则的输入框的值
      if (!/^\S{6,12}$/.test(value)) {
        return '密码长度必须是6~12位，并且不能有空格'
      }
    },
    // 验证两次密码
    regpassword: function (value) {
      // value 表示确认密码
      let pwd = $('.register input[name="password"]').val().trim() // 获取密码
      if (value !== pwd) {
        return '两次密码不一致'
      }
    },
  })
});
// 点击去注册
// console.log($('.register form'));
$('.register form').submit(function (e) {
  e.preventDefault();
  var data = {
    username: $('.register input[name=username]').val(),
    password: $('.register input[name=password]').val()
  }
  console.log(data);
  $.post('/api/reguser', data, function (
    res
  ) {
    if (res.status === 0) {
      layer.msg(res.message)
      $('.register a').click()
      $('.login form input[name=username]').val(data.username)
      $('.login form input[name=password]').val(data.password)
    } else {
      layer.msg(res.message)
    }
  })
})
// http://ajax.frontend.itheima.net
// 点击去登录
$('.login form').submit(function (e) {
  e.preventDefault();
  var data = $(this).serialize()
  console.log(data);
  $.post('/api/login', data, function (
    res
  ) {
    if (res.status === 0) {
      localStorage.setItem('token', res['token'])
      layer.msg(res.message)
      location.href = '../../index.html'
    } else {
      layer.msg(res.message)
    }
  })
})