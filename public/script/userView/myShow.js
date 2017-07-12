$('.top_login_link_img').on('mouseover', function() {
    $('.showBox').fadeIn(300);
})
$('.showBox').on('mouseover', function() {
    $('.showBox').css('display', 'block');
})
$('.header_top').on('mouseleave', function() {
    $('.showBox').fadeOut(300);
})
$('.showBox').on('mouseleave', function() {
    $('.showBox').fadeOut(300);
})