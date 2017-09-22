require.config({
    baseUrl:'/public/assets',
    paths:{
        jquery:'jquery/jquery',
        cookie:'jquery-cookie/jquery.cookie',
        template:'artTemplate/template-web',
        bootstrap:'bootstrap/js/bootstrap',
        datepicker:'bootstrap-datepicker/js/bootstrap-datepicker',
        datelocales:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        common:'../js/common',
        login:'../js/login',
        teacherList:'../js/teacherList',
        teacherAdd:'../js/teacherAdd',
        util:'../js/util'
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        datelocales:{
            deps:['jquery']
        }
    }
});