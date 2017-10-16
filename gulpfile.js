var gulp = require('gulp');
var concat = require('gulp-concat'); //- 多个文件合并为一个；  
var minifyCss = require('gulp-minify-css'); //- 压缩CSS为一行；  
var uglify = require('gulp-uglify'); //压缩js 
// //压缩css  
gulp.task('css', function () {
  var rootdir = process.argv[2];
  return gulp.src([rootdir + '/www/build/main.css']) //- 需要处理的css文件，放到一个字符串数组里  
    .pipe(concat('main.css')) //- 合并后的文件名  
    .pipe(minifyCss()) //- 压缩处理成一行  
    .pipe(gulp.dest(rootdir + '/www/build/')); //- 输出文件本地;  
});
// //压缩js  
gulp.task("js", function () {
  var rootdir = process.argv[2];
  return gulp.src([rootdir + '/www/build/main.js',
      rootdir + '/www/build/vendor.js',
      rootdir + '/www/build/polyfills.js'
    ])
    // .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(rootdir + '/www/build/'));
});
// 修改 index.html
var cheerio = require('gulp-cheerio');
gulp.task('indexHtml', function() {
    var rootdir = process.argv[2];
    return gulp.src(rootdir + '/www/index.html')
        .pipe(cheerio(function ($) {
            // $('script').remove();
            // $('link').remove();
            // $('body').append('<script src="build/main.min.js"></script>');
            // $('head').append('<script src="cordova.js"></script>');
        }))
        .pipe(gulp.dest(rootdir + '/www/'));
});

gulp.start('css');
gulp.start('js');
// gulp.start('indexHtml');
