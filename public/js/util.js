define(function () {
    return {
        qs: function (info) {
            var result = location.search.slice(1);
            /* 变数组 */
            if (result) {
                result = result.split('&');
                result.forEach(function (item, i) {
                    var kv = item.split('=');
                    if (kv[0] == info) {
                        result = kv[1];
                        return false;
                    }
                });
                return result;
            }
        },
        setAsideActive: function (path) {
            $('.aside .navs a[href="' + path + '"]').addClass('active').parent().parent().show();
        }
    }
});