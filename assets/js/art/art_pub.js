$(function () {
  var Id = window.location.href.split('?')[1] || ''
  var state = '已发布'
  $('#caogao').click(function () {
    state = '草稿'
  })
  // 初始化富文本编辑器
  initEditor()
  // 获取分类
  $.get(`/my/article/cates`, function (res) {
    if (res.status === 0) {
      // console.log(res);
      var strHTML = template('cate', res)
      $('[name=cate_id]').html(strHTML)
      layui.form.render()
    }
  })

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
  }
  // 3. 初始化裁剪区域
  $image.cropper(options)
  //   伪造按钮
  $('#chooseImage').click(function () {
    $('#file').click()
  })

  $('#file').change(function (e) {
    var fd = e.target.files[0]
    // console.log(fd)
    var newImgURL = URL.createObjectURL(fd)
    // console.log(newImgURL);
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })


  if (Id !== '') {
    $.ajax({
      method: 'GET',
      url: `/my/article/${Id}`,
      success: function (res) {
        layui.form.val('formPub', res.data)
      }
    })
  }
  //   表单提交
  $('#formPub').submit(function (e) {
    e.preventDefault()
    const src = $image.attr('src')
    // console.log(src);
    if (src.indexOf('/assets/images/sample2.jpg') !== -1) {
      return layer.msg('请上传图片后再生成头像!')
    }
    var fd = new FormData($(this)[0])
    $image
      .cropper('getCroppedCanvas', {
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将裁剪之后的图片，转化为 blob 对象
        fd.append('cover_img', blob)
        fd.append('state', state)
        if (Id !== '') {
          fd.append('Id', Id)
        }
        // 发起请求，把文章信息保存到服务器
        $.ajax({
          method: 'POST',
          url: Id === '' ? '/my/article/add' : '/my/article/edit',
          processData: false,
          contentType: false,
          data: fd,
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg(Id === '' ? '发表文章失败' : '更新文章失败')
            } else {
              // 发表文章成功之后，立即跳转到文章列表页面
              location.href = '/art/art_list.html'
            }
          }
        })
      })
  })
})

//
// [1,2,3,4,5].forEach(function(a,b){})