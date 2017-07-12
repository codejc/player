/**
 * Created by hongjincong on 2017/6/30.
 */

function SlideBar3D(sum,con) {
    this.slideBarIndex = 1;
    this.container =con;
    this.swichBarIndex = 0;
    this.sum = sum;
}
SlideBar3D.prototype = {
    clickLeft: function () {
        this.swichBarIndex--;
        let list = $('.jingcai li');
        $("img[data-idx='0']").css({
            'transform': 'scale(1)',
            'left': '0',
            'opacity': '0.7',
            'z-index': '1'
        });
        $("img[data-idx='-1']").css({
            'transform': 'scale(1)',
            'left': '608px',
            'z-index': '1',
            'opacity': '0.7'
        });
        $("img[data-idx='1']").css({
            'transform': 'scale(1.2)',
            'left': '304px',
            'opacity': '1',
            'z-index': '3'
        });
        this.slideBarIndex++;
        if (this.slideBarIndex == 3) {
            this.slideBarIndex = 0;
        }
        list.eq(this.slideBarIndex).children('img').attr('data-idx', '0')
        list.eq(this.slideBarIndex - 1).children('img').attr('data-idx', '-1')
        list.eq(this.slideBarIndex - 2).children('img').attr('data-idx', '1')
    },
    clickRight:function () {
        this.swichBarIndex++;
        let list = $('.jingcai li');
        $("img[data-idx='0']").css({
            'transform': 'scale(1)',
            'left': '608px',
            'opacity': '0.7',
            'z-index': '1'
        });
        $("img[data-idx='-1']").css({
            'transform': 'scale(1.2)',
            'left': '304px',
            'z-index': '3',
            'opacity': '1'
        });
        $("img[data-idx='1']").css({
            'transform': 'scale(1)',
            'left': '0',
            'opacity': '0.7',
            'z-index': '1'
        });
        this.slideBarIndex--;
        if (this.slideBarIndex == -3) {
            this.slideBarIndex = 0;
        }
        list.eq(this.slideBarIndex).children('img').attr('data-idx', '0')
        list.eq(this.slideBarIndex + 1).children('img').attr('data-idx', '1')
        list.eq(this.slideBarIndex + 2).children('img').attr('data-idx', '-1')
    }
};