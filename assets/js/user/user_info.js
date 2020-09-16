$(function(){
  // 渲染页面
  initUserInfo()
  function initUserInfo(){
    $.get('/my/userinfo',function(res){
      if(!res.status){
        layui.form.val('formInfo',res.data)
      } else {}
    })
  }
  layui.form.verify({
    nickname: function(value){
      if(value.length > 6){
        return '昵称长度必须在1~6个字符之间'
      }
    }
  })
  // 点击重置 重置表单
  //layui 默认重置按钮 即可重置表单 不需要写
  $('#btn-reset').click(function (e) {
    e.preventDefault()
    initUserInfo()
  })

  //提交修改
  $('#formInfo').submit(function(e){
    e.preventDefault();
    $.post('/my/userinfo',$(this).serialize(),function(res){
      if(!res.status){
        layer.msg(res.message)
        window.parent.getUserInfo()
      }
    })
  })

})