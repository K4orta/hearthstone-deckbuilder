var react = require('gulp-react');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function(gulp) {
	gulp.task('react', function () {

	return gulp.src([
			'public/**/*.react.js',
			'!public/dist/**/*'
		]).pipe(react())
		.pipe(gulp.dest('public/dist/'));
	});
};

