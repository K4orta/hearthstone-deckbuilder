"use strict";

module.exports = function(gulp) {
	// Load task
  var less = require('gulp-less'),
      prefix = require('gulp-autoprefixer'),
      livereload = require('gulp-livereload'),
      pixrem = require('gulp-pixrem'),
      sourcemaps = require('gulp-sourcemaps'),
      combiner = require('stream-combiner2');

  gulp.task('less', function() {
    var combined = combiner.obj([
      gulp.src([
        'public/less/**/*.less',
        '!public/less/**/_*.less'
      ]),
      sourcemaps.init(),
      less({
        paths: [
          'public/less'
        ]
      }),
      prefix('last 2 version', 'ie >= 8'),
      pixrem(),
      sourcemaps.write(),
      gulp.dest('public/dist'),
      livereload()]);

      combined.on('error', console.error.bind(console));
      return combined;
  });
};
