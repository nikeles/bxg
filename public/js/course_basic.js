define(['jquery','template','util','form'],function ($,template,util){
    // 实现选选中效果
    util.setAsideActive('/course/course_add');
    // 获取课时id
    var cs_id=util.qs('cs_id');
    // 获取操作标志位
    var flag = util.qs('flag');
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data:{"cs_id":cs_id},
        dataType:'json',
        success:function (data){
            if(data.code==200){
                console.log(data);
                // 处理一下标题
                if(flag){
                    // 编辑操作
                    data.result.operate='编辑操作';
                }else{
                    // 添加操作
                    data.result.operate='添加操作';
                };
                var html = template('basicTpl',data.result);
                $("#basicInfo").html(html);
            }
            
        }
    })
})