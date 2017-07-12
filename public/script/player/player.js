audio = $('audio')[0];
volumeTmp = audio.volume = 0.5;
index = 0;
sl = '';
maxT = $('.player_inner').width();
maxV = $('.player_voice').width();

for (i = 0; i < songList.length; i++) {
    url = songList[i].url;
    name = songList[i].name;
    singer = songList[i].singer;
    dur = songList[i].duration;
    sl += `
    <li class="list">
        <ul class="songlist_item">
            <li class="songlist_edit">
                <input type="checkbox" class="songlist_checkbox">
            </li>
            <li class="songlist_number">
                <img class="wave" src="/images/player/wave.gif">
                <span>${i + 1}</span>
            </li>
            <li class="songlist_songname">
                <span>${name}</span>
            </li>
            <li class="songlist_artist">
                <span>${singer}</span>
            </li>
            <li class="songlist_time">
                <span>${parseTime(dur)}</span>
            </li>
        </ul>
    </li>
    <i class="songlist_line"></i>
    `;
}
$('.songlist_list').html(sl);

// 自动播放第一首歌
setTimeout('setPlay(0);', 1000);

function setPlay(i) {
    img_url = '/images/player/song' + (i + 1) + '.jpg';
    url = songList[i].url;
    name = songList[i].name;
    singer = songList[i].singer;
    album = songList[i].album;
    lrc = songList[i].lrc;
    lrcList = '';

    $('.bg_player').css('background-image', 'url(' + img_url + ')');
    $('.songlist_item').css('opacity', '.6');
    $('.songlist_item').eq(i).css('opacity', '1');
    $('.wave').css('display', 'none');
    $('.wave').eq(i).css('display', 'inline-block');
    $('.song_info_pic').attr('src', img_url);
    $('.song_info_name').text('歌曲名：' + name);
    $('.song_info_singer').text('歌手名：' + singer);
    $('.song_info_album').text('专辑名：' + (album == '' ? '空' : album));
    $('.player_music_info').text(name + ' - ' + singer);
    $('.btn_big_play').addClass('btn_big_play_pause');

    for (content in lrc) {
        lrcList += '<p time=' + content + '>' + lrc[content] + '</p>';
    }
    $('.song_lyric_inner').html(lrcList);

    audio.src = './music/' + url;
    audio.play();
}

function parseTime(t) {
    min = parseInt(t / 60);
    min = min > 9 ? min : '0' + min;
    sec = parseInt(t % 60);
    sec = sec > 9 ? sec : '0' + sec;
    return min + ':' + sec;
}

// 播放时间进度
$('audio').bind('timeupdate', function() {
    if (!isNaN(audio.duration)) {
        tp = audio.currentTime / audio.duration;
        $('.player_music_time').text(parseTime(audio.currentTime) + ' / ' + parseTime(audio.duration));
        $('.player_play').width(tp * 100 + '%');
        $('.player_dot').css('left', tp * maxT - 5);

        for (l = 0; l < $('.song_lyric_inner p').length; l++) {
            if (parseTime(audio.currentTime) == $('.song_lyric_inner p').eq(l).attr('time')) {
                $('.song_lyric_inner').css({
                    'transition': '-webkit-transform 0.1s ease-out',
                    'transform': 'translate3d(0px, -' + 34 * l + 'px, 0px)'
                });
                $('.song_lyric_inner p').css('color', '');
                $('.song_lyric_inner p').eq(l).css('color', '#31c27c');
            }
        }
    }
});

// 播放结束处理
$('audio').bind('ended', function() {
    // 顺序播放
    if ($('#play_mod').hasClass('btn_big_style_order')) {
        index++;
        if (index >= songList.length) {
            index = 0;
            return;
        }
        setPlay(index);
    }

    // 随机播放
    if ($('#play_mod').hasClass('btn_big_style_random')) {
        index = parseInt(Math.random() * songList.length);
        setPlay(index);
    }

    // 单曲循环
    if ($('#play_mod').hasClass('btn_big_style_single')) {
        setPlay(index);
    }

    // 列表循环
    if ($('#play_mod').hasClass('btn_big_style_list')) {
        index++;
        if (index >= songList.length) {
            index = 0;
        }
        setPlay(index);
    }
});

// 上一曲
$('.btn_big_prev').click(function() {
    index--;
    if (index < 0) {
        index = songList.length - 1;
    }
    setPlay(index);
});

// 暂停/播放
$('.btn_big_play').click(function() {
    if (audio.paused) {
        $('.wave').eq(index).css('display', 'inline-block');
        $(this).addClass('btn_big_play_pause');
        audio.play();
    } else {
        $('.wave').eq(index).css('display', 'none');
        $(this).removeClass('btn_big_play_pause');
        audio.pause();
    }
});

// 下一曲
$('.btn_big_next').click(function() {
    index++;
    if (index >= songList.length) {
        index = 0;
    }
    setPlay(index);
});

// 点击进度条快进
$('.player').click(function(e) {
    ev = e || event;
    currentT = ev.clientX - $('.player_music')[0].offsetLeft - $('.mod_player')[0].offsetLeft;
    tp = currentT / maxT;
    $('.player_play').width(tp * 100 + '%');
    $('.player_dot').css('left', tp * maxT - 5);
    audio.currentTime = tp * audio.duration;
});

// 拖动进度条快进
$('.player_dot')[0].onmousedown = function(e) {
    $('audio').unbind('timeupdate');

    ev = e || event;
    progressLeft = ev.clientX - this.offsetLeft;

    document.onmousemove = function(e) {
        ev = e || event;
        currentT = ev.clientX - progressLeft;
        currentT = currentT < 0 ? 0 : currentT;
        currentT = currentT > maxT ? maxT : currentT;
        tp = currentT / maxT;

        $('.player_music_time').text(parseTime(tp * audio.duration) + ' / ' + parseTime(audio.duration));
        $('.player_play').width(tp * 100 + '%');
        $('.player_dot').css('left', tp * maxT - 5);
    };

    document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
        audio.currentTime = tp * audio.duration;

        $('audio').bind('timeupdate', function() {
            if (!isNaN(audio.duration)) {
                tp = audio.currentTime / audio.duration;
                $('.player_music_time').text(parseTime(audio.currentTime) + ' / ' + parseTime(audio.duration));
                $('.player_play').width(tp * 100 + '%');
                $('.player_dot').css('left', tp * maxT - 5);
            }

            for (l = 0; l < $('.song_lyric_inner p').length; l++) {
                if (parseTime(audio.currentTime) == $('.song_lyric_inner p').eq(l).attr('time')) {
                    $('.song_lyric_inner').css({
                        'transition': '-webkit-transform 0.1s ease-out',
                        'transform': 'translate3d(0px, -' + 34 * l + 'px, 0px)'
                    });
                    $('.song_lyric_inner p').css('color', '');
                    $('.song_lyric_inner p').eq(l).css('color', '#31c27c');
                }
            }
        });
    };
};

$('#play_mod').click(function() {
    // 顺序播放
    if ($('#play_mod').hasClass('btn_big_style_order')) {
        $('#play_mod').removeClass('btn_big_style_order').addClass('btn_big_style_random');
        $('#play_mod').attr('title', '随机播放');
    } else {
        // 随机播放
        if ($('#play_mod').hasClass('btn_big_style_random')) {
            $('#play_mod').removeClass('btn_big_style_random').addClass('btn_big_style_single');
            $('#play_mod').attr('title', '单曲循环');
        } else {
            // 单曲循环
            if ($('#play_mod').hasClass('btn_big_style_single')) {
                $('#play_mod').removeClass('btn_big_style_single').addClass('btn_big_style_list');
                $('#play_mod').attr('title', '列表循环');
            } else {
                // 列表循环
                if ($('#play_mod').hasClass('btn_big_style_list')) {
                    $('#play_mod').removeClass('btn_big_style_list').addClass('btn_big_style_order');
                    $('#play_mod').attr('title', '顺序播放');
                }
            }
        }
    }
});

// 点击改变音量
$('.player_voice').click(function(e) {
    ev = e || event;
    currentV = ev.clientX - $('.player_voice')[0].offsetLeft - $('.mod_player')[0].offsetLeft;
    currentV = currentV < 0 ? 0 : currentV;
    currentV = currentV > maxV ? maxV : currentV;
    vp = currentV / maxV;

    $('.volume_play').width(vp * 100 + '%');
    $('.volume_dot').css('left', vp * maxV - 5);
    volumeTmp = audio.volume = vp;
    $('.btn_big_voice').removeClass('btn_big_voice_no');
});

// 拖动改变音量
$('.volume_dot')[0].onmousedown = function(e) {
    ev = e || event;
    progressLeft = ev.clientX - this.offsetLeft;

    document.onmousemove = function(e) {
        ev = e || event;
        currentV = ev.clientX - progressLeft;
        currentV = currentV < 0 ? 0 : currentV;
        currentV = currentV > maxV ? maxV : currentV;
        vp = currentV / maxV;

        $('.volume_play').width(vp * 100 + '%');
        $('.volume_dot').css('left', vp * maxV - 5);
        volumeTmp = audio.volume = vp;
    };

    document.onmouseup = function() {
        $('.btn_big_voice').removeClass('btn_big_voice_no');
        document.onmousemove = document.onmouseup = null;
    };
};

// 点击改变音量
$('.btn_big_voice').click(function() {
    if (!$('.btn_big_voice').hasClass('btn_big_voice_no')) {
        audio.volume = 0;
    } else {
        audio.volume = volumeTmp;
    }
    $('.btn_big_voice').toggleClass('btn_big_voice_no');
})