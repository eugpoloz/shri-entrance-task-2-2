var gulp = require("gulp");
var log = require("fancy-log");
var sourcemaps = require("gulp-sourcemaps");
var imagemin = require("gulp-imagemin");
var browserSync = require("browser-sync").create();
var svgo = require("gulp-svgo");
var postcss = require("gulp-postcss");
var csso = require("gulp-csso");
var autoprefixer = require("autoprefixer");
var htmlmin = require("gulp-htmlmin");

// TODO: sourcemaps and uglify

//Log
gulp.task("log", function() {
  log("== Log This ==");
});

//CSS & Autoprefixer Comp
gulp.task("css", function() {
  gulp
    .src("src/styles/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .on("error", log)
    .pipe(csso())
    .on("error", log)
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/styles"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", function() {
  gulp
    .src("src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
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
    .src("src/assets/*")
    .pipe(imagemin())
    .on("error", log)
    .pipe(svgo())
    .on("error", log)
    .pipe(gulp.dest("dist/assets"))
    .pipe(browserSync.reload({ stream: true }));
});

//Watch for changes
gulp.task("watch", function() {
  gulp.watch("src/styles/*.css", ["css"]);
  gulp.watch("src/*.html", ["html"]);
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
gulp.task("default", ["css", "html", "js", "assets", "browser-sync", "watch"]);
