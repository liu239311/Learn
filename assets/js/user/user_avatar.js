$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //点击伪上传按钮
    $('#btn-upload').click(function () {
        $('#file').click()
    })

    // 监听上传文件
    $('#file').on('change', function (e) {
        if (!e.target.files.length) {
            return
        }
        // 获取图片对象
        var file = e.target.files[0]
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //点击确定上传图片更新页面
    $('#btn-confirm').on('click', function (e) {
        const src = $image.attr('src')
        if (src.indexOf('/assets/images/sample.jpg') !== -1) {
            return layer.msg('请上传图片后再生成头像!')
        }
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //上传新图
        $.post('/my/update/avatar', {
            avatar: dataURL
        }, function (res) {
            if (res.status) {
                return layer.msg('更新头像失败')
            } else {
                layer.msg('更新头像成功!')
                window.parent.getUserInfo()
            }
        })
    })
})