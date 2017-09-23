define(['jquery', 'template', 'util', 'datelocales', 'datepicker', 'validate'], function ($, template, util, validate) {
    var result = util.qs('id');
    if (result) {
        /* 编辑操作 */
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            data: {tc_id: result},
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    var html = template('addTpl', data.result);
                    $('#teacherInfo').html(html);
                    /* 表单校验 */
                   formCheck();

                    /* 表单编辑功能 */
                    submitForm('/api/teacher/update');
                    /* 提示日期控件 */
                    date();
                }
            }
        })
    } else {
        /* 添加操作 */
        var html = template('addTpl', {});
        $('#teacherInfo').html(html);
        submitForm('/api/teacher/add');
        /* 表单校验 */
        formCheck();
        /* 表单添加功能 */

        submitForm('/api/teacher/add');

        /* 显示提示日期控件 */
        date();
    }
    ;

    /* 实现表单添加功能 */
    function submitForm(aa) {
        function bb() {
        $('#teacherBtn').on('click', function () {
            var data = $('#formInfo').serialize();
                $.ajax({
                    type: 'post',
                    url: aa,
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.code == 200) {
                            console.log(111)
                            location.href = '/teacher/list';
                        }
                    }
                })
        })
        };
        window.bb=bb;
    };

    /* 实现提示日期时间 */
    function date() {
        $('.input-date').datepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            endDate: '0d'
        });
    }

    /* 实现表单检验 */
    function formCheck() {
        $().ready(function () {
            $("form").validate({
                onfocusout: function (element) {
                    $(element).valid()
                },
                debug: true,
                rules: {
                    tc_name: "required",
                    tc_pass: {
                        required: true,
                        minlength: 5
                    },
                    tc_join_date: {
                        required: true,
                        dateISO: true
                    }
                },
                messages: {
                    required: "这是必填字段",
                    tc_name: "请输入姓名",
                    tc_pass: {
                        required: "请输入密码",
                        minlength: "密码不能小于5个字符"
                    },
                    tc_join_date: {
                        required: "请核对格式 例:2009-06-23",
                        minlength: "请核对格式 例:2009-06-23",
                    },
                },
                submitHandler: function () {
                    //    数据全部通过
                    bb();
                },
                errorPlacement: function (error, element) {
                    if (element.attr('name') == 'tc_gender') {
                        error.insertAfter(".status11");
                    } else {
                        error.appendTo(element.parent().next());
                    }
                },
            });
        });
        $.extend($.validator.messages, {
            required: "这是必选的"
        });
    }

});