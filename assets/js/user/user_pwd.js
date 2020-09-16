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
  //表单提交
  console.log($('button[type=reset]'));
  $('form').on('submit',function(e){
    e.preventDefault()
    $.post('/my/updatepwd',$(this).serialize(),function(res){
      // console.log(res);
      layer.msg(res.message)
      if(res.status === 0) {
        $('button[type=reset]').click()
      }
    })
  })
})