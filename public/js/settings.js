define(['jquery', 'template', 'region', 'uploadify'], function ($, template) {
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                var html = template('settingsTpl', data.result);
                $('#settingsInfo').html(html);
                /* 处理头像上传 */
                $('#upfile').uploadify({
                    swf: '/public/assets/uploadify/uploadify.swf',
                    uploader: '/api/uploader/avatar',
                    buttonText: '',
                    //显示的高度和宽度，默认 height 30；width 120
                    height: 120,
                    width: 120,
                    itemTemplate:'<span></span>',
                    // 提交到后台的图片名称
                    fileObjName: 'tc_avatar',
                    // 成功之后返回的结果在data里
                    onUploadSuccess: function (file, data, response) {
                        var src = JSON.parse(data);
                        src = src.result.path;
                        $('.preview img').attr('src', src);
                    }
                })
                /*  处理省级县三级联动 */
                $("#pcd").region({
                    url: '/public/assets/jquery-region/region.json'
                })
            }
        }
    })
});