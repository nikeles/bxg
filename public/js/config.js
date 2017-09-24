require.config({
    baseUrl:'/public/assets',
    paths:{
        jquery:'jquery/jquery',
        cookie:'jquery-cookie/jquery.cookie',
        template:'artTemplate/template-web',
        bootstrap:'bootstrap/js/bootstrap',
        datepicker:'bootstrap-datepicker/js/bootstrap-datepicker',
        datelocales:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate:'validate/jquery.validate.min',
        region:'jquery-region/jquery.region',
        uploadify:'uploadify/jquery.uploadify.min',
        ckeditor:'ckeditor/ckeditor',
        common:'../js/common',
        login:'../js/login',
        teacherList:'../js/teacherList',
        teacherAdd:'../js/teacherAdd',
        util:'../js/util',
        settings:'../js/settings'
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        datelocales:{
            deps:['jquery']
        },
        uploadify:{
            deps:['jquery']
        },
    }
});