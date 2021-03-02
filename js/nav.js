$(function () {
    // nav收缩展开
    $('.nav-item>a').on('click', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
            } else {
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
    //nav-mini切换
    $('#mini').on('click', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            $('.nav-item.nav-show').removeClass('nav-show');
            $('.nav-item').children('ul').removeAttr('style');
            $('.nav').addClass('nav-mini');
        } else {
            $('.nav').removeClass('nav-mini');
        }
    });

});

function onc1() {
    var dd = document.getElementById("nav1").scrollIntoView(true);	 //这个意思其实就是将这个元素到顶部来浏览器窗口的顶部来显示
}

function onc2() {
    var dd = document.getElementById("nav2").scrollIntoView(true);	 //这个意思其实就是将这个元素到顶部来浏览器窗口的顶部来显示
}

function onc3() {
    var dd = document.getElementById("nav3").scrollIntoView(true);	 //这个意思其实就是将这个元素到顶部来浏览器窗口的顶部来显示
}

function onc4() {
    var dd = document.getElementById("nav4").scrollIntoView(true);	 //这个意思其实就是将这个元素到顶部来浏览器窗口的顶部来显示
}