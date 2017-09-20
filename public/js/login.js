define(['jquery','cookie'],function ($){
    /* 处理登录按钮 */
    $('#btn-login').click(function () {
        var info = $('#login').serialize();
        $.ajax({
            url: '/api/login',
            data: info,
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {    
                    /* 登录成功 */
                    location.href = '/main/index';
                    data.result = JSON.stringify(data.result);
                    /* 注意这里设置的时候只能是字符串 */
                    $.cookie('loginInfo',data.result);  
                }
            }
        })
        return false;
    })
})