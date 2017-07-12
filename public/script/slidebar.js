/**
 * Created by hongjincong on 2017/6/30.
 */

function SlideBar(num, con) {
    this.num = num;
    this.slideBarIndex = 0;
    this.isClickAble = true;
    this.swichBarIndex = 0;
    this.container = con;
}


SlideBar.prototype = {
    clickLeft: function (obj) {
        if (obj.isClickAble) {
            obj.slideBarIndex++;
            obj.swichBarIndex--;
            swichBarChange(obj,obj.num);
            obj.isClickAble = false
            if (obj.slideBarIndex != 1) {
                $(obj.container + ' .slidebar ul').css('margin-left', obj.slideBarIndex * 1200 + 'px');
            }
            /*
             * 判断是否最后一张图片
             * */
            if (obj.slideBarIndex == 1) {
                let newUl = $(obj.container + ' .slidebar ul').clone();
                newUl.attr('class', 'onshow');
                $(obj.container + ' .slidebar ul').before(newUl);
                $(obj.container + ' .slidebar ul').addClass('delete').removeClass('onshow');
                newUl.removeClass('delete')
                newUl.css('margin-left', -obj.num * 1200 + 'px');
                setTimeout(function () {
                    $(obj.container + ' .slidebar ul').css('margin-left', -(obj.num - 1) * 1200 + 'px');
                    setTimeout(function () {
                        $(obj.container + ' .delete').remove();
                        obj.slideBarIndex = -(obj.num - 1);
                    }, 400)
                }, 100)
            }
            /*
             * 阻止鼠标连点
             * */
            setTimeout(function () {
                obj.isClickAble = true;
            }, 500);
        }
    },
    clickRight: function (obj) {
        if (obj.isClickAble) {
            obj.slideBarIndex--;
            obj.swichBarIndex++;
            swichBarChange(obj,obj.num);
            obj.isClickAble = false
            $(obj.container + ' .slidebar ul').css('margin-left', obj.slideBarIndex * 1200 + 'px');
            /*
             * 判断是否最后一张图片
             * */
            if (obj.slideBarIndex == -obj.num) {
                let newUl = $(obj.container + ' .slidebar ul').clone();
                newUl.attr('class', 'onshow');
                $(obj.container + ' .slidebar ul').after(newUl);
                $(obj.container + ' .slidebar ul').addClass('delete').removeClass('onshow');
                newUl.removeClass('delete')
                newUl.css('margin-left', '0px');
                setTimeout(function () {
                    $('.delete').remove();
                    obj.slideBarIndex = 0;
                }, 500)
            }
            /*
             * 阻止鼠标连点
             * */
            setTimeout(function () {
                obj.isClickAble = true;
            }, 500)
        }
    }
};

function swichBarChange(obj, sum) {
    console.log(sum)
    let swiches = $(obj.container + ' .switchbar a');
    if (obj.swichBarIndex < 0) {
        obj.swichBarIndex = sum-1;
    }
    if (obj.swichBarIndex > sum - 1) {
        obj.swichBarIndex = 0
    }
    swiches.eq(obj.swichBarIndex).css('opacity', '1');
    console.log(swiches.eq(obj.swichBarIndex))

    swiches.eq(obj.swichBarIndex).siblings().css('opacity', '0.4');
}