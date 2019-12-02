// 渲染歌单列表数据
(function($, root) {
    function renderList(data) {
        var str = '';
        data.forEach(function(ele, index) {
            str += `<li data.index=${index}>${ele.song + ' - ' + ele.singer}</li>`;
        });
        $('.playlist').html(str);
        $('.playlist li').eq(0).addClass('active');
    }
    root.renderList = renderList;
} (window.Zepto, window.player || (window.player = {})));