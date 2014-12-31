"use strict";

module.exports = function(gulp) {
  var jshint = require("gulp-jshint");

  gulp.task("jshint", function() {
    return gulp.src([
      "public/**/*.js",
      "!node_modules/**",
      "!public/components/**"
    ])
      .pipe(jshint())
      .pipe(jshint.reporter("default"));
  });
};
