/**
 * Created by hongjincong on 2017/7/2.
 */
var searchInput = new Vue({
    el: '.search_input',
    data: {
        message: '',
        scrolled: '',
        isShow: false
    },
    methods: {
        doSearch: function () {
            getSongs(this.message, 0)
        },
        handleScroll: function () {
            this.scrolled = window.scrollY;
            console.log(this.scrolled);
            if (window.scrollY > 130) {
                this.isShow = true;
            }
            else {
                this.isShow = false;
            }
        }
    },
    mounted: function () {
        window.addEventListener('scroll', this.handleScroll);
    }
});
var pageTab = new Vue({
    el: '.page_tab_bar',
    data: {
        isClicked: ''
    },
    methods: {
        gopage: function (e) {
            var onshow = e.target;
            $(onshow).addClass('page_tab_clicked').siblings().removeClass('page_tab_clicked');
            getSongs(searchInput.message, onshow.id);
        }
    },
    mounted: function () {
        $('.page_tab_bar>#1').addClass('page_tab_clicked');
    }
});


function formatTime(num) {
    var minute = parseInt(num / 1000 / 60);
    var second = parseInt(num / 1000 % 60);
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    return minute + ':' + second;
}
function getSongs(msg, page) {
    $('list_body>ul').empty();
    $.ajax({
        type: "GET",
        async: false,
        url: "http://localhost:3000/search?keywords=" + msg + '&limit=20&offset=' + page,
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.result.songs.length; i++) {
                data.result.songs[i].duration = formatTime(data.result.songs[i].duration);
            }
            mainList.items = data.result.songs;
            console.log(data.result.songs);
        },
        error: function () {
            alert('error');
        }
    });
}