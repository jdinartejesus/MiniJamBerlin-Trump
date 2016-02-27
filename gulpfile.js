var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function () {
  gulp.src('src/assets/js/**.js')
		.pipe(browserify({
  		insertGlobals: true,
		}))
		.pipe(gulp.dest('./build/assets/js'));
});

gulp.task('html', function () {
  gulp.src('./src/index.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', 'scripts');
});

gulp.task('default', ['html', 'scripts', 'watch']);
