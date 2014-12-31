'use strict';
module.exports = function(gulp) {
  var browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      gutil = require('gulp-util'),
      reactify = require('reactify');

  gulp.task('browserify', function() {
    browserify(['./public/js/main.js'])
      .transform(reactify)
      .bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('./public/dist/'));
  });
};
