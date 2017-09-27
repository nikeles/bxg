define(['jquery', 'template', 'util', 'bootstrap','form'], function ($, template, util) {
    // 左侧侧边栏选中效果
    util.setAsideActive('/course/course_add');
    var id = util.qs('cs_id');
    $.ajax({
        type: 'get',
        url: '/api/course/lesson',
        dataType: 'json',
        data: { 'cs_id': id },
        success: function (data) {
            if (data.code == 200) {
                var html = template('lessonTpl', data.result);
                $("#lessonInfo").html(html);
                // 绑定添加课时事件
                $(".add-btn").on('click', function () {
                    //    渲染页面
                    var html = template('editTpl',{myInfo:'添加课时'});
                    $("#editInfo").html(html);
                    // 显示模态框
                    $('#chapterModal').modal();
                    // 处理表单提交事件
                    var ctId = $('.edit-btn').attr('data-ctId');
                    $('#btn-add').on('click',function (){
                        $('#fromInfo').ajaxSubmit({
                            type:'post',
                            url:'/api/course/chapter/add',
                            data:{ct_cs_id:id},
                            dataType:'json',
                            success:function (data){
                                if(data.code==200){
                                   //  成功之后刷新页面
                                    location.reload();
                                }
                            }
                        })
                  })
                });
                // 绑定编辑课时事件
                $('.edit-btn').click(function () {
                    var ctId = $(this).attr('data-ctId');
                    $.ajax({
                        type:'get',
                        url:'/api//course/chapter/edit',
                        data:{ct_id:ctId},
                        dataType:'json',
                        success:function (data){
                            if(data.code==200){
                                data.result.myInfo='编辑课时';
                                var html = template('editTpl',data.result);
                                $("#editInfo").html(html);
                                // 请求数据成功之候在显示模态框。
                                $('#chapterModal').modal();
                                // 处理表单提交事件
                               $('#btn-add').on('click',function (){
                                     $('#fromInfo').ajaxSubmit({
                                         type:'post',
                                         url:'/api/course/chapter/modify',
                                         data:{ct_id:ctId,ct_cs_id:id},
                                         dataType:'json',
                                         success:function (data){
                                             if(data.code==200){
                                                //  成功之后刷新页面
                                                 location.reload();
                                             }
                                         }
                                     })
                               })
                            }
                        }
                    })
                })
            }
        }
    })
})