// 遮罩层的宽高
function setMaskSize() {
    var width = $(document).width()
    var height = $(document).height()
        // 链式调用
    $('#mask').width(width).height(height)
}
setMaskSize()

function setBoxCenter() {
    var top = ($(window).height() - $('#signUpView').height()) / 2 + $(document).scrollTop()
    var left = ($(window).width() - $('#signUpView').width()) / 2 + $(document).scrollLeft()
    $('#signUpView').css({
        left: left,
        top: top
    })
}
setBoxCenter()

// 文档滑动时重置位置
$(document).scroll(function() {
    setMaskSize()
    setBoxCenter()
})

// 屏幕大小改变时重置位置
$(window).resize(function() {
    setMaskSize()
    setBoxCenter()
})

$('.signUpViewBtn').click(function() {
    $('#mask').fadeIn()
    $('#signUpView').fadeIn()
    $('#signInView').fadeOut();
    $('html').css('overflow', 'hidden');
    $('#signUpView input').css('border', '1px solid lightgrey');
})


$('#signUpView h2 a').click(function() {
    $('#signUpView').fadeOut()
    $('#mask').fadeOut()
    $('html').css('overflow', 'visible');
    $('#signUpView .input').val('');
    $('#signUpView div span').html('');
})