define(['jquery', 'template','ckeditor', 'util', 'form'], function ($, template, CHEDITOR, util) {
    // 实现选选中效果
    util.setAsideActive('/course/course_add');
    // 获取课时id
    var cs_id = util.qs('cs_id');   
    // 获取操作标志位
    var flag = util.qs('flag');
    $.ajax({
        type: 'get',
        url: '/api/course/basic',
        data: { "cs_id": cs_id },
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                // 处理一下标题
                if (flag) {
                    // 编辑操作
                    data.result.operate = '编辑操作';
                } else {
                    // 添加操作
                    data.result.operate = '添加操作';
                };
                var html = template('basicTpl', data.result);
                $("#basicInfo").html(html);
                // 实现二级联动
                $("#firstSelect").on('input', function () {
                    var pid = $(this).val();
                    $.ajax({
                        type: 'get',
                        url: '/api/category/child',
                        data: { 'cg_id': pid },
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 200) {
                                var tpl = '{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
                                var html = template.render(tpl, { list: data.result });
                                $("#lastSelect").html(html);
                            }
                        }
                    })

                });
                // 处理富文本
                CKEDITOR.replace('editor', {
                    'toolbarGroups': [
                        {name: 'clipboard', groups: ['clipboard', 'undo']},
                        {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']}
                    ]
                });
            }

        }
    })
})