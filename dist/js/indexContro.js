(function ($, root){
    function Control(len) {
        this.len = len;
        this.index = 0;
    }

    Control.prototype = {
        prev: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        // 计算改变后的索引
        getIndex: function(num) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + num + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }

    root.controIndex = Control;

}(window.Zepto, window.player || (window.player = {})))