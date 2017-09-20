define(['jquery', 'cookie'], function ($) {
	// NProgress.start();

	// NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	/* 实现退出功能 */
	$('#logout').click(function () {
		$.ajax({
			type: 'post',
			url: '/api/logout',
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					location.href = '/main/login';
				}
			}
		})
	});
	/* 判断用户有没有登录 */
	var flag = $.cookie('PHPSESSID');
	if (!flag) {
		if (location.pathname != '/main/login') {
			location.href = '/main/login';
		}	
	}
	/* 同步头像和用户名 */
	var loginInfo = $.cookie('loginInfo');
	loginInfo = loginInfo && JSON.parse(loginInfo);
	$('.aside .profile img').attr('src', loginInfo.tc_avatar);
	$('.aside .profile h4').html(loginInfo.tc_name);
});

















