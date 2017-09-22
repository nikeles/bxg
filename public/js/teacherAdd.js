define(['jquery','template','util','datelocales','datepicker'],function ($,template,util) {
    var result = util.qs('id');
    if(result){
        /* 编辑操作 */
            $.ajax({
                type:'get',
                url:'/api/teacher/edit',
                data:{tc_id:result},
                dataType:'json',
                success:function (data) {
                    if(data.code == 200){
                        var html = template('addTpl',data.result);
                        $('#teacherInfo').html(html);
                        /* 表单编辑功能 */
                        submitForm('/api/teacher/update');
                        date();
                    }
                }
            })
    }else{
        /* 添加操作 */
        var html = template('addTpl',{});
        $('#teacherInfo').html(html);
        submitForm('/api/teacher/add');
        date();
    };
    /* 实现表单添加功能 */
    function submitForm(aa) {
        $('#teacherBtn').on('click',function () {
            var data = $('#formInfo').serialize();
            $.ajax({
                type:'post',
                url:aa,
                data:data,
                dataType:'json',
                success:function (data) {
                    console.log(data);
                    if(data.code==200){
                        console.log(11);
                        location.href='/teacher/list';
                    }
                }
            })
        })
    };
    /* 实现提示日期时间 */
    function date() {
        $('.input-date').datepicker({
            language:'zh-CN',
            format:'yyyy-mm-dd',
            endDate:'0d'
        });
    }
});