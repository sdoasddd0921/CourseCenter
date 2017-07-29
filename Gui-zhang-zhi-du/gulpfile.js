var gulp = require('gulp'),
    connect = require('gulp-connect');

var jsSrc = './js/pages/*.js',
    htmlSrc = './pages/systemManage/*.html',
    cssSrc = './css/classManage/*.css';

gulp.task('connect', function() {
  connect.server({
    root: __dirname,
    port: 9000,
    livereload: true
  })
})

gulp.task('watch', function() {
  gulp.watch(jsSrc, ['js']);
  gulp.watch(cssSrc, ['css']);
  gulp.watch(htmlSrc, ['html']);
})

gulp.task('js', function() {
  gulp.src(jsSrc)
      .pipe(connect.reload())
})
gulp.task('css', function() {
  gulp.src(cssSrc)
      .pipe(connect.reload())
})
gulp.task('html', function() {
  gulp.src(htmlSrc)
      .pipe(connect.reload())
})
gulp.task('default', ['connect', 'watch']);