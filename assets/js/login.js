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
      let pwd = $('input[name="password"]').val().trim() // 获取密码
      if (value !== pwd) {
        return '两次密码不一致'
      }
    },
  })
});
// 点击去登录

$('.register form').submit(function (e) {
  e.preventDefault();
  var data = {
    username: $('.register form input[name=username]').val(),
    password: $('.register form input[name=password]').val()
  }
  $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (
    res
  ) {
    if (res.status === 0) {
      console.log(res.message)
    } else {
      console.log(res.message)
    }
    alert(1)
  })
})