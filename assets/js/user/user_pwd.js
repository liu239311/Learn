$(function () {
  var form = layui.form
  form.verify({
    len: [/^\S{6,12}$/, '长度必须6到12位，不能有空格'],
    // 验证新密码不能和原密码相同
    diff: function (value) {
      // value 表示新密码
      // 获取原密码
      let oldPwd = $('[name="oldPwd"]').val()
      if (value === oldPwd) {
        return '新密码不能和原密码相同'
      }
    },

    // 验证两次新密码必须相同
    same: function (value) {
      // value 表示确认密码
      // 获取新密码
      let newPwd = $('[name="newPwd"]').val()
      if (newPwd !== value) {
        return '两次密码不一致'
      }
    },
  })
  $('form').on('submit', function (e) {
    e.preventDefault()
    // 获取表单中的数据，ajax提交
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(), // 一定要检查表单各项的name属性；用layui的表单取值也可以
      success: function (res) {
        // console.log(res);
        layer.msg(res.message)
        if (res.status === 0) {
          // 重置输入框
          $('button[type="reset"]').click()
        }
      },
    })
  })
})