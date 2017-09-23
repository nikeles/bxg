define(['jquery','template','region'],function ($,template) {
   $.ajax({
       type:'get',
       url:'/api/teacher/profile',
       dataType:'json',
       success:function (data) {
           if(data.code==200){
               var html = template('settingsTpl',data.result);
               $('#settingsInfo').html(html);
               /* 处理头像上传 */

               /*  处理省级县三级联动 */
               $("#pcd").region({
                   url:'/public/assets/jquery-region/region.json'
               })
           }
       }
   })
});