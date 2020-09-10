$.ajaxPrefilter(function (options) {
  var token = localStorage.getItem('token') || '';
  //配置统一请求路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  //配置统一请求头
  options.headers = {
    Authorization: token
  }
})