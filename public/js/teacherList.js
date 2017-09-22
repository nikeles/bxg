define(['jquery','template','bootstrap'],function ($,template){
    $.ajax({
       type:'get',
       url:'/api/teacher',
       dataType:'json',
       success:function (data) {
           console.log(data);
          if(data.code === 200){
              /*  渲染页面  */
              var html = template('teacherTpl',{list:data.result});
              $('#teacherInfo').html(html);
              /*  完成注销启用功能 */
              $('.btn-logOff').on('click',function () {
                  var $that = $(this);
                  var td = $that.parent('td');
                  var id = $that.parent('td').attr('data-id');
                  var status = $that.parent('td').attr('data-status');
                  $.ajax({
                      type:"post",
                      url:'/api/teacher/handle',
                      data:{tc_id:id,
                      tc_status:status
                      },
                      dataType:'json',
                      success:function (data) {
                          console.log(data);
                          if(data.code == 200){
                              // 注意改状态的值
                              td.attr('data-status',data.result.tc_status);
                              if(data.result.tc_status==0){
                                  $that.html('启用');
                              }else{
                                  $that.html('注销')
                              };

                          }
                      }
                  })
              });
              btn_look();
          }

       }
    });
    /* 实现点击常看按钮功能 */
    function btn_look() {
        var id =
        $(".btn-look").on('click',function () {
            var id = $(this).closest('td').attr('data-id');
            $.ajax({
                type:"get",
                url:"/api/teacher/view",
                data:{"tc_id":id},
                dataType:"json",
                success:function (data) {
                    if(data.code==200){
                        var html = template('modalTpl',data.result);
                        $('.modalInfo').html(html);
                        $('#teacherModal').modal('show');
                    }
                }
            })
        })
    };
});

