var gulp = require('gulp'),
    connect = require('gulp-connect');

var jsSrc = './src/js/*.js';
var jsDist = './dist/js';

var htmlSrc = './src/*.html';
var htmlDist = './dist';

var cssSrc = './src/css/*.css';
var cssDist = './dist/css';

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port:8001,
    livereload: true
  });
});

gulp.task('watch', function() {
  // watch()的格式：第一个参数可以不为数组，第二个参数必须为数组
  gulp.watch(jsSrc, ['js']);
  gulp.watch(cssSrc, ['css']);
  gulp.watch(htmlSrc, ['html']);
})

gulp.task('js', function() {
  gulp.src(jsSrc)
      .pipe(gulp.dest(jsDist))
      .pipe(connect.reload())
});

gulp.task('css', function() {
  gulp.src(cssSrc)
      .pipe(gulp.dest(cssDist))
      .pipe(connect.reload())
});

gulp.task('html', function() {
  gulp.src(htmlSrc)
      .pipe(gulp.dest(htmlDist))
      .pipe(connect.reload())
});

gulp.task('default', ['connect', 'watch']);
