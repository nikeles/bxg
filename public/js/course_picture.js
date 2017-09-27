define(['jquery', 'template', 'util', 'jcrop', 'uploadify','form'], function ($, template, util) {
    // 处理右侧选中效果
    util.setAsideActive('/course/course_add');
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
                var html = template('pictureTpl', data.result);
                $("#pictureInfo").html(html);
                // 处理上传裁切课程图片
                $('#myfile').uploadify({
                    buttonText: '选择图片',
                    width: 80,
                    height: 'auto',
                    itemTemplate: '<span></span>',
                    buttonClass: 'btn btn-success btn-sm',
                    swf: '/public/assets/uploadify/uploadify.swf',
                    uploader: '/api/uploader/cover',
                    fileObjName: 'cs_cover_original',
                    formData: { cs_id: csid },
                    onUploadSuccess: function (a, b, c) {
                        var src = JSON.parse(b.trim());

                        console.log(src.result.path);
                        $('.picture .preview img').attr('src', src.result.path);
                        console.log($('.picture .preview img').attr('src'));

                        // 上传成功直接出现裁剪图片
                        cutPicture();
                        $('#jcrop-btn').text('保存图片').attr('data-flag',true);
                    }
                });
                // 处理封面裁切
                $("#jcrop-btn").on('click', function () {
                    //    判断是不是第一次点击
                    var flag = $(this).attr('data-flag');
                    if (flag) {
                        // 第二次点击(跳转下一步)
                        $('#cropForm').ajaxSubmit({
                            type:'post',
                            url:'/api/course/update/picture',
                            dataType:'json',
                            success:function (data){
                                console.log(data);
                                if(data.code==200){
                                    //  location.href = '/course/course_lesson?cs_id='+data.result.cs_id;
                                }
                            }
                        })
                       
                    } else {
                        // 第一次点击
                        $(this).text('保存图片').attr('data-flag', true);
                        cutPicture();
                    }
                });
                // 封装一个方法裁切图片      
                function cutPicture() {
                    var img = $('.preview img');
                    var nowCrop = null;
                    img.Jcrop({
                        boxWidth: 400,
                        aspectRatio: 2
                    }, function () {
                        // 裁剪之前的裁剪实例(固定语法)
                        nowCrop&&nowCrop.destroy();
                        nowCrop=this;
                        // 计算图片的宽高
                        var width = this.ui.stage.width
                        var height = this.ui.stage.height
                        // 计算选区的宽高
                        var x = 0;
                        var y = (height-width/2) / 2;
                        var w0 = width;
                        var h0 = width / 2; 
                        this.newSelection();
                        this.setSelect([x, y, w0, h0]);
                        // 处理缩略图
                        this.initComponent('Thumbnailer',{
                            width:240,
                            height:120,
                            myposition:'.thumb'
                        });
                        // 设置位置
                        $('.jcrop-thumb').css({
                            position:'absolute',
                            top:0,
                            left:0
                        });
                            var input = $("#cropForm").find('input');
                            input.eq(0).val(x);
                            input.eq(1).val(y);
                            input.eq(2).val(w0);
                            input.eq(3).val(h0);
                        // 监控选区变化
                        img.parent().on('cropstart corpmove corpend',function (a,b,c){
                                console.log(c);
                                var input = $("#cropForm").find('input');
                                input.eq(0).val(c.x);
                                input.eq(1).val(c.y);
                                input.eq(2).val(c.w);
                                input.eq(3).val(c.h)
                        })
                    }
                    )
                };
            }
        }
    })
})