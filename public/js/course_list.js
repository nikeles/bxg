define(['jquery','template','util'],function ($,template,util) {
    util.setAsideActive(location.pathname);
    $.ajax({
        type:'get',
        url:'/api/course',
        dataType:'json',
        success:function (data) {
            if(data.code==200){
                var html = template('courseTpl',{list:data.result});
                $("#courseInfo").html(html);

            }
        }
    })
});