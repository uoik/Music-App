// 渲染总时间

(function($, root) {
    var frameId;
    var startTime;
    var allTime;
    var lastPer = 0;
    // 渲染时间
    function renderAllTime(time) {
        allTime = time
        time = formtTime(time);
        $('.all-time').html(time);
    }
    // 处理时间为分秒
    function formtTime(time){
        time = Math.round(time);
        var m = Math.floor(time / 60);
        var s = time % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }
    // 音乐播放 记录时间
    function start(t) {
        lastPer = t == undefined ? lastPer : t;
        startTime = new Date().getTime();
        cancelAnimationFrame(frameId);
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (allTime * 1000);
            if(per <= 1){
                update(per)
            }else{
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame)
        }
        frame();
    }
    // 停止
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (allTime * 1000);
    }

    function update(per) {
        var time = formtTime(allTime * per);
        $('.cur-time').html(time);
        var perX = (per - 1) * 100 + '%';
        $('.pro-top').css({
            transform: 'translateX('+ perX +')'
        })
    }

    // 将接口暴露出去
    root.pro = {
        renderAllTime,
        start,
        stop,
        update
    }

} (window.Zepto, window.player || (window.player = {})));