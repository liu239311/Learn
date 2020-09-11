$.ajaxPrefilter(function (options) {
  var token = localStorage.getItem('token') || '';
  //配置统一请求路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  //配置统一请求头
  if (!options.url.includes('/api/')) {
    options.headers = {
      Authorization: token
    }
  }
  //配置统一token判断
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      window.localStorage.removeItem('token') || ''
      window.location.href = '../../login.html'
    } else {}
  }
})