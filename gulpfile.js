var gulp = require("gulp");
var pug = require("gulp-pug");
var log = require("fancy-log");
var imagemin = require("gulp-imagemin");
var browserSync = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

// TODO: sourcemaps and uglify

//Log
gulp.task("log", function() {
  log("== Log This ==");
});

//CSS & Autoprefixer Comp
gulp.task("css", function() {
  gulp
    .src("src/*.css")
    .pipe(postcss([autoprefixer()]))
    .on("error", log)
    .pipe(gulp.dest("dist"))
    .on("error", log)
    .pipe(browserSync.reload({ stream: true }));
});

//Pug Comp
gulp.task("pug", function() {
  gulp
    .src("src/index.pug")
    .pipe(pug())
    .on("error", log)
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
});

//JS Comp
gulp.task("js", function() {
  gulp
    .src("src/*.js")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
});

//Copy assets
gulp.task("assets", function() {
  gulp
    .src("src/assets/*.*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets"))
    .pipe(browserSync.reload({ stream: true }));
});

//Watch for changes
gulp.task("watch", function() {
  gulp.watch("src/*.css", ["css"]);
  gulp.watch("src/index.pug", ["pug"]);
  gulp.watch("src/*.js", ["js"]);
  gulp.watch("src/assets/*.*", ["assets"]);
});

// Set up the static server
gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "index.html"
    },
    port: 8080
  });
});

//Setting up the starter gulp package
gulp.task("default", ["css", "pug", "js", "assets", "browser-sync", "watch"]);
