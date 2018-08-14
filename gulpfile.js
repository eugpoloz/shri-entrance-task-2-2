var gulp = require('gulp');
var pug = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var log = require('fancy-log');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

//Log
gulp.task('log', function() {
  log('== Log This ==');
});

//Stylus & Autoprefixer Comp
gulp.task('stylus', function() {
  gulp
    .src('src/*.styl')
    .pipe(stylus({ 'include css': true }))
    .on('error', log)
    .pipe(
      autoprefixer({ browsers: ['last 3 versions', 'ie >= 9'], cascade: true })
    )
    .on('error', log)
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }));
});

//Pug Comp
gulp.task('pug', function() {
  gulp
    .src('src/index.pug')
    .pipe(pug({ pretty: true }))
    .on('error', log)
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }));
});

//JS Comp
gulp.task('js', function() {
  gulp
    .src('src/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true }));
});

//Copy assets
gulp.task('assets', function() {
  gulp
    .src('src/assets/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.reload({ stream: true }));
});

//Watch for changes
gulp.task('watch', function() {
  gulp.watch('src/*.styl', ['stylus']);
  gulp.watch('src/index.pug', ['pug']);
  gulp.watch('src/*.js', ['js']);
  gulp.watch('src/assets/*.*', ['copy']);
});

// Set up the static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist',
      index: 'index.html'
    },
    port: 8080
  });
});

//Setting up the starter gulp package
gulp.task('default', [
  'stylus',
  'pug',
  'js',
  'assets',
  'browser-sync',
  'watch'
]);
