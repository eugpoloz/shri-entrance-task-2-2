var gulp = require('gulp'),
  pug = require('gulp-pug'),
  autoprefixer = require('gulp-autoprefixer'),
  stylus = require('gulp-stylus'),
  connect = require('gulp-connect'),
  log = require('fancy-log'),
  imagemin = require('gulp-imagemin');

//Log
gulp.task('log', function() {
  log('== Log This ==');
});

//Stylus & Autoprefixer Comp
gulp.task('stylus', function() {
  gulp
    .src('app/*.styl')
    .pipe(stylus({ 'include css': true }))
    .on('error', log)
    .pipe(
      autoprefixer({ browsers: ['last 3 versions', 'ie >= 9'], cascade: true })
    )
    .on('error', log)
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

//Pug Comp
gulp.task('pug', function() {
  gulp
    .src('app/index.pug')
    .pipe(pug({ pretty: true }))
    .on('error', log)
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

//JS Comp
gulp.task('js', function() {
  gulp
    .src('app/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

//Copy assets
gulp.task('copy', function() {
  gulp
    .src('app/images/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
});

//Watch for changes
gulp.task('watch', function() {
  gulp.watch('app/*.styl', ['stylus']);
  gulp.watch('app/index.pug', ['pug']);
  gulp.watch('app/*.js', ['js']);
  gulp.watch('app/images/*.*', ['copy']);
});

//Set up the server for life reload
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

//Setting up the starter gulp package
gulp.task('default', ['stylus', 'pug', 'js', 'copy', 'connect', 'watch']);
