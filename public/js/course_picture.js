define(['jquery', 'template', 'util','uploadify'], function ($, template, util ) {
    // 处理右侧选中效果
    util.setAsideActive('/course/add');
    // 获取地址栏的cs_id
    var csid = util.qs('cs_id');
    $.ajax({
        type: 'get',
        url: '/api/course/picture',
        data: { 'cs_id': csid },
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                // 渲染页面
                var html = template('pictureTpl',data.result);
                $("#pictureInfo").html(html);
                // 处理上传裁切课程图片
                $('#myfile').uploadify({
                    buttonText:'选择图片',
                    width:80,
                    height:'auto',
                    itemTemplate:'<span></span>',
                    buttonClass:'btn btn-success btn-sm',
                    swf:'/public/assets/uploadify/uploadify.swf',
                    uploader:'/api/uploader/cover',
                    fileObjName:'cs_cover_original',
                    formData:{cs_id:csid},
                    onUploadSuccess:function (a,b,c){
                       var src = JSON.parse(b.trim());
                       $('.picture .preview img').attr('src',src.result.path);
                    }
                })
            }
        }
    })
})