var root = window.player;
var dataList = [];
var len = 0;
var audio = root.audioManager;
var control;
var timer = null;

// 获取数据
function getData(url){
    $.ajax({
        type:"GET",
        url: url,
        success: function(data){
            dataList = data;
            len = dataList.length;
            control = new root.controIndex(len);
            root.render(dataList[0]);
            audio.getAudio(dataList[0].audio);
            root.pro.renderAllTime(dataList[0].duration);
            bindEvent();
            bindTouch();
            proTouch();
        },
        error: function () {
            console.log("error")
        }
    })
}
getData("../mock/data.json");

// 绑定事件
function bindEvent() {
    $('body').on("play:change", function(e, i){
        audio.getAudio(dataList[i].audio);
        root.render(dataList[i]);
        root.pro.start(0);
        if(audio.status == "play"){
            audio.play();
            var deg = $('.img-box').data('deg');
            rotated(deg);
        }else if(audio.status == 'pause'){
            root.pro.stop();
        }
        $(".img-box").data('deg', 0).css({
            'transform' : 'rotateZ(0deg)',
            'transition' : 'all ease-in'
        })
        root.pro.renderAllTime(dataList[i].duration);
    })

    // 上下切歌
    $('.prev').on('click', function () {
        var i = control.prev();
        $('body').trigger('play:change', i);
    });
    $('.next').on('click', function () {
        var i = control.next();
        $('body').trigger('play:change', i);
    })

    // 开始暂停
    $('.play').on('click', function () {
        if(audio.status == "pause"){
            audio.play();
            root.pro.start();
            var deg = $('.img-box').data('deg');
            rotated(deg);
        }else if(audio.status == 'play'){
            root.pro.stop();
            audio.pause();
            clearInterval(timer);
        }
        $(".play").toggleClass("playing");
    })
    // 歌单列表
    $('.list').on('click', function() {
        root.renderList(dataList);
        $('.list-item').show();
    })
    // 关闭歌单列表
    $('.list-btn.guan').on('click', function() {
        $('.list-item').hide();

    });
    // 点击对应歌曲切歌
    $('.playlist').on('click', function(e) {
        var target = e.target;
        $('.active', this).removeClass('active');
        $(target).addClass('active');
        var i = $(target).index();
        $('body').trigger('play:change', i);
    })
}

// 图像旋转
function rotated(deg) {
    clearInterval(timer);
    timer = setInterval(function() {
        deg = +deg;
        deg += 1;
        $(".img-box").data('deg', deg).css({
            'transform' : 'rotateZ('+ deg +'deg)',
            'transition' : 'all ease-in'
        })
    }, 100)
}

var offset = $('.pro-bottom').offset();
var left = offset.left;
var w = offset.width;
// 进度条拖拽事件
function bindTouch() {
    var $slider = $('.slider');
    $slider.on('touchstart', function(){
        root.pro.stop();
    }).on('touchmove', function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / w;
        if (per > 0 && per < 1) {
            root.pro.update(per);
        }
    }).on('touchend', function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / w;
        if (per > 0 && per < 1) {
            var curTime = per * dataList[control.index].duration;
            $('.play').addClass('playing');
            audio.playTo(curTime);
            root.pro.start(per);
        }
    })
}

function proTouch() {
    var $pro_B = $('.pro-bottom');
    $pro_B.on('touchstart', function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / w;
        root.pro.update(per);
        if (per > 0 && per < 1) {
            var curTime = per * dataList[control.index].duration;
            $('.play').addClass('playing');
            audio.playTo(curTime);
            root.pro.start(per);
        }
    })
}
// 获取数据     getData()
// 渲染信息和图片、背景高斯模糊   render.js
// 点击按钮   bindEvent()
// 插入播放器     audioContro.js
// 进度条       pro.js
// 图片旋转     rotated()
// 列表切歌     bindEvent()