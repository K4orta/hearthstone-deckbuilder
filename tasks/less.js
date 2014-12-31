"use strict";

module.exports = function(gulp) {
	// Load task
  var less = require("gulp-less"),
      prefix = require("gulp-autoprefixer"),
      livereload = require("gulp-livereload"),
      pixrem = require("gulp-pixrem"),
      sourcemaps = require("gulp-sourcemaps");

  gulp.task("less", function() {
    return gulp.src([
      "public/less/**/*.less",
      "!public/less/**/_*.less"
    ])
      .pipe(sourcemaps.init())
      .pipe(less({
        paths: [
          "public/less"
        ]
      }))
      .pipe(prefix("last 2 version", "ie >= 8"))
      .pipe(pixrem())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("public/dist"))
      .pipe(livereload());
  });
};
