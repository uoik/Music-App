(function ($, root) {

    function AudioManager(){
        this.audio = new Audio(); // 创建音频对象
        this.status = "pause"; // 默认暂停
    }

    AudioManager.prototype = {
        play:function(){
            this.audio.play();
            this.status = "play";
        },
        pause:function() {
            this.audio.pause();
            this.status = "pause";
        },
        getAudio:function(src) {
            this.audio.src = src;
            this.audio.status = "pause";
        },
        playTo: function(time) {
            this.audio.currentTime = time;
            this.status = "play";
            this.audio.play();
        }
    }

    root.audioManager = new AudioManager();

}(window.Zepto, window.player || (window.player = {})))