$('.tag_item').on('click', function() {
    if ($(this).siblings('.tag_item_click')) {
        $(this).siblings('.tag_item_click').removeClass('tag_item_click').addClass('tag_item');
        $(this).addClass('tag_item_click').removeClass('tag_item');

    }
    if ($(this).siblings('.tag_tit').attr('id') == 'yz') {
        var text = $(this).text()
        $('#yzl').css('display', 'inline-block')
        $('#yzl').html(text + '&#x3000;<a href="javascript:;">x</a>');
    }
    if ($(this).siblings('.tag_tit').attr('id') == 'lp') {
        var text = $(this).text()
        $('#lpl').css('display', 'inline-block')
        $('#lpl').html(text + '&#x3000;<a href="javascript:;">x</a>');
    }
    if ($(this).siblings('.tag_tit').attr('id') == 'jg') {
        var text = $(this).text()
        $('#jgl').css('display', 'inline-block')
        $('#jgl').html(text + '&#x3000;<a href="javascript:;">x</a>');
    }


    if ($(this).parent('div').attr('id') == 'lblist') {
        var text = $(this).text()
        $('#lbl').css('display', 'inline-block')
        $('#lbl').html(text + '&#x3000;<a href="javascript:;">x</a>');
        $(this).parent('div').css('display', 'none')
        $('#lb').html(text)


    }
    if ($(this).parent('div').attr('id') == 'ndlist') {
        var text = $(this).text()
        $('#ndl').css('display', 'inline-block')
        $('#ndl').html(text + '&#x3000;<a href="javascript:;">x</a>');
        $(this).parent('div').css('display', 'none')
        $('#nd').html(text)


    }

    if ($(this).parent('div').attr('id') == 'gslist') {
        var text = $(this).text()
        $('#gsl').css('display', 'inline-block')
        $('#gsl').html(text + '&#x3000;<a href="javascript:;">x</a>');
        $(this).parent('div').css('display', 'none')
        $('#gs').html(text)

    }


})
$('.tag_item_click').on('click', function() {
    if ($(this).siblings('.tag_item_click')) {
        $(this).siblings('.tag_item_click').removeClass('tag_item_click').addClass('tag_item');
        $(this).removeClass('tag_item_click').addClass('tag_item_click')
    }
})
$('.tag_item_list').on('click', function() {
    if ($(this).attr('id') == 'lb') {
        if ($('#lblist').css('display') == 'none') {
            $('#lblist').css('display', 'block');
            $('#ndlist').css('display', 'none');
            $('#gslist').css('display', 'none');
            $(this).addClass('sup').removeClass('sub')


            // console.log(1)
        } else if ($('#lblist').css('display') == 'block') {
            $('#lblist').css('display', 'none');
            $('#ndlist').css('display', 'none');
            $('#gslist').css('display', 'none');
            $(this).addClass('sub').removeClass('sup')
                // console.log(1)
        }
    } else if ($(this).attr('id') == 'nd') {
        if ($('#ndlist').css('display') == 'none') {
            $('#ndlist').css('display', 'block');
            $('#lblist').css('display', 'none');
            $('#gslist').css('display', 'none');
            $(this).addClass('sup').removeClass('sub')

            // console.log(1)
        } else if ($('#ndlist').css('display') == 'block') {
            $('#lblist').css('display', 'none');
            $('#ndlist').css('display', 'none');
            $('#gslist').css('display', 'none');
            $(this).addClass('sub').removeClass('sup')
                // console.log(1)
        }
    } else if ($(this).attr('id') == 'gs') {
        if ($('#gslist').css('display') == 'none') {
            $('#gslist').css('display', 'block');
            $('#ndlist').css('display', 'none');
            $('#lblist').css('display', 'none');
            $(this).addClass('sup').removeClass('sub')

            // console.log(1)
        } else if ($('#gslist').css('display') == 'block') {
            $('#lblist').css('display', 'none');
            $('#ndlist').css('display', 'none');
            $('#gslist').css('display', 'none');
            $(this).addClass('sub').removeClass('sup')
                // console.log(1)
        }
    }

})

var albumpic = 1;
for (var i = 0; i < 20; i++) {
    $('.playlist_cover').eq(i).css('background-image', 'url(/images/album/' + albumpic + '.jpg)')
    albumpic++;

}
$('.playlist_cover').on('mouseenter', function() {
    $(this).children('i').css('display', 'block')
    $(this).css('background-size', '110% 110%');
    $(this).css('background-position', '50% 50%')

})
$('.playlist_cover').on('mouseleave', function() {
    $(this).children('i').css('display', 'none')
    $(this).css('background-size', '100% 100%');
    $(this).css('background-position', '50% 50%')

})
$('.part_switch_item').on('click', function() {
    $(this).siblings('.part_switch_item_action').addClass('part_switch_item').removeClass('part_switch_item_action')
    $(this).addClass('part_switch_item_action').removeClass('part_switch_item')
})
$('.part_switch_item_action').on('click', function() {
    $(this).addClass('part_switch_item_action').removeClass('part_switch_item')
    $(this).siblings('.part_switch_item_action').addClass('part_switch_item').removeClass('part_switch_item_action')
})
$('.part_detail_tit').on('click', 'span a', function() {

    var id = $(this).parents('span').attr('id')

    if (id == 'lbl') {
        $('#lb').text('类别')
        $('#lb').addClass('sub').removeClass('sup')
    }
    if (id == 'ndl') {
        $('#nd').text('年代')
        $('#nd').addClass('sub').removeClass('sup')
    }
    if (id == 'gsl') {
        $('#gs').text('唱片公司')
        $('#gs').addClass('sub').removeClass('sup')
    }
    if (id == 'yzl') {

        $('#yz').siblings().addClass('tag_item').removeClass('tag_item_click')
        $('#yz').next().addClass('tag_item_click')
    }
    if (id == 'lpl') {

        $('#lp').siblings().addClass('tag_item').removeClass('tag_item_click')
        $('#lp').next().addClass('tag_item_click')
    }
    if (id == 'jgl') {

        $('#jg').siblings().addClass('tag_item').removeClass('tag_item_click')
        $('#jg').next().addClass('tag_item_click')
    }
    $(this).parents('span').css('display', 'none');
})