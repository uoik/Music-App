var gulp = require("gulp");

// 压缩 HTML
// gulp中插件应用  下载插件 - 取到插件 - 应用插件
var htmlClean = require("gulp-htmlclean");

// 压缩图片
var imageMin = require("gulp-imagemin");

// 处理 less 文件 转化 css
var less = require("gulp-less");
// 压缩css
var cleanCss = require("gulp-clean-css")
// 添加css前缀 利用两个插件 gulp-postcss autoprefixer
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
 
// 压缩JS
var uglify = require("gulp-uglify");
// 去掉JS中的调式语句
var deBug = require("gulp-strip-debug");

// 开启服务器
var connect = require("gulp-connect");


var folder = {
    src:"src/",
    dist:"dist/"
}

// 设置node环境变量 命令行使用
// $ export NODE_ENV=development

var devMod = process.env.NODE_ENV  == "development"; // 判断当前环境是否是开发;

gulp.task("html", function() { // 通过task定义一个任务
    var page = gulp.src(folder.src + "html/*") // 读取文件src/html文件夹下的所有文件 - 并放入管道 .pipe 进行流处理
        .pipe(connect.reload()) // 监听文件，有改变就自动刷新
        if(!devMod){
            page.pipe(htmlClean()) // 压缩html
        }
        page.pipe(gulp.dest(folder.dist + "html/")) // 将文件重新写入到dist/html文件夹中 如果没则创建一个文件夹
})
gulp.task("image", function() {
    gulp.src(folder.src + "image/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
})
gulp.task("css", function() {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload()) // 监听文件，有改变就自动刷新
        .pipe(less()) // 转化成css
        .pipe(postcss([autoprefixer()])) // 添加前缀
        if(!devMod){
            page.pipe(cleanCss()) // 压缩
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task("js", function() {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload()) // 监听文件，有改变就自动刷新
        if(!devMod){
            page.pipe(deBug()) // 清除调式内容
            .pipe(uglify()) // 压缩JS
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("server", function () { // 开启服务器
    connect.server({
        port:"9091", //  更换服务器端口号
        livereload: true // 自动刷新
    });
})

// 开启一个新任务，监听文件
gulp.task("watch", function(){
    gulp.watch(folder.src + "html/*",["html"]); // 监听当前路径下的html, 改变了就触发 html 任务
    gulp.watch(folder.src + "css/*",["css"]); // 监听当前路径下的css, 改变了就触发 css 任务
    gulp.watch(folder.src + "js/*",["js"]); // 监听当前路径下的js, 改变了就触发 js 任务
})


gulp.task("default", ["html","css","js","image","server","watch"])


// gulp.src(globs[, options]) // 路径
// gulp.dest(path[, options]) // 传输
// gulp.task(name[, deps], fn) // 定义一个任务
// gulp.watch(glob[, opts], tasks) // 加监听文件

// gulp = runner task = 任务运行器
// webpack = module bundle = 模块打包器