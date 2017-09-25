define(['jquery', 'template', 'ckeditor','region', 'uploadify', 'datepicker','validate', 'form'], function ($, template, CHEDITOR) {
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
                    itemTemplate: '<span></span>',
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
                });
                /* 处理复文本 */
                CKEDITOR.replace('editor', {
                    'toolbarGroups': [
                        {name: 'clipboard', groups: ['clipboard', 'undo']},
                        {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']}
                    ]
                });
                // 实现提示日期时间
                //date();
                // 实现保存功能
                $().ready(function () {
                    $("#formInfo").validate({
                        submitHandler: function () {
                            var p = $('#p').find('option:selected').text();
                            var c = $('#c').find('option:selected').text();
                            var d = $('#d').find('option:selected').text();
                            var hometown = p + '|' + c + '|' + d;
                            // 同步富文本内容
                            for (var instance in CKEDITOR.instances) {
                                /*内置方法*/
                                CKEDITOR.instances[instance].updateElement();
                            }
                            $('#formInfo').ajaxSubmit({
                                type: 'post',
                                url: '/api/teacher/modify',
                                data: {tc_hometown: hometown},
                                dataType: 'json',
                                success: function (data) {
                                    if (data.code == 200) {
                                        // 修改成功之后重新刷新当前页码
                                        location.reload();
                                    }
                                }
                            });
                        }
                });
            })
        }
    }
});

    /* 实现提示日期时间 */
    function date() {
        $('.input-date').datepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            endDate: '0d'
        });
    };
});