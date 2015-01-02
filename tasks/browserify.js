'use strict';
module.exports = function(gulp) {
  var browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      gutil = require('gulp-util'),
      reactify = require('reactify'),
      uglify = require('gulp-uglify');


  gulp.task('browserify', function() {
    browserify(['./public/js/main.js'])
      .transform(reactify)
      .bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./public/dist/'));
  });
};
