// 遮罩层的宽高
function setMaskSize() {
    var width = $(document).width()
    var height = $(document).height()
        // 链式调用
    $('#mask').width(width).height(height)
}
setMaskSize()

function setBoxCenter() {
    var top = ($(window).height() - $('#signInView').height()) / 2 + $(document).scrollTop()
    var left = ($(window).width() - $('#signInView').width()) / 2 + $(document).scrollLeft()
    $('#signInView').css({
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

$('.signInViewBtn').click(function() {
    $('#mask').fadeIn()
    $('#signInView').fadeIn()
    $('html').css('overflow', 'hidden');
    $('#signInView .input').val('');
})


$('#signInView h2 a').click(function() {
    $('#signInView').fadeOut()
    $('#mask').fadeOut()
    $('html').css('overflow', 'visible');
    $('#signInView .input').val('');
    $('#signInView div span').html('');
})