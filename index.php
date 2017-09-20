<?php
    //后端路由
    header('content-type:text/html;charset=utf8');
    // include('footer.html');
    // echo 123;
    // include 在当前页面嵌套一个子页面
    // var_dump($_SERVER); //数组
    /* 默认目录名称 */
    $dir = 'main';
    /* 默认文件名称 */
    $files = 'index';
    /* 判断 PATH_INFO 这个属性在 $_SERVER 存不存在 返回boolean值 */
    // array_key_exists('PATH_INFO',$_SERVER);
    if(array_key_exists('PATH_INFO',$_SERVER)){
        $path = $_SERVER['PATH_INFO']; // /main/index
        $info = substr($path,1);
        $result = explode('/',$info);
        if(count($result) == 2){
            $dir = $result[0];
            $files = $result[1];
        }else{
            $files = 'login';
        }
    }
    // echo $path;
    /* 嵌入子页面 */
    include('./views/'.$dir.'/'.$files.'.html');
?>

