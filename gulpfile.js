var gulp = require('gulp');
var del = require('del');
var fs = require('fs');
var browserSync = require('browser-sync').create();

var paths = {
  src: 'app/**/*',
  srcCSS: 'app/**/*.css',
  srcJS: 'app/**/*.js',

  tmp: 'tmp', // tmp folder
  tmpCSS: 'tmp/**/*.css', // css files in tmp folder
  tmpJS: 'tmp/**/*.js', // js files in tmp folder

  dist: 'dist',
  distCSS: 'dist/**/*.css',
  distJS: 'dist/**/*.js'
};

// build
gulp.task('default', ['copy', 'js']);

// serve & watch
gulp.task('serve', function () {
  browserSync.init({
    server: paths.tmp,
    port: 8000
  });
  
  gulp.watch(paths.srcJS, ['js-watch']);
});

// build, serve, & watch
gulp.task('serve:build', ['copy', 'js', 'serve']);

// this task ensures the `js` task is complete before reloading browsers
gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

// Clean output directory
gulp.task('clean', function () {
  del(['tmp/*', 'dist/*']); // del files rather than dirs to avoid error
});

// CSS
gulp.task('css', function () {
  return gulp.src(paths.srcCSS)
    .pipe(gulp.dest(paths.tmp));
});
// JS
gulp.task('js', function () {
  return gulp.src(paths.srcJS)
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('copy', ['css', 'js']);
