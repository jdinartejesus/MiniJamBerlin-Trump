var gulp        = require('gulp');
var util        = require('gulp-util');
var inject      = require('gulp-inject');
var sass        = require('gulp-sass');
var notify      = require('gulp-notify');
var eslint      = require('gulp-eslint');
var minifyCSS   = require('gulp-minify-css');
var browserify  = require('gulp-browserify');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var imagemin    = require('gulp-imagemin');
var webserver   = require('gulp-webserver');
var concat      = require('gulp-concat');
var sequence    = require('run-sequence');
var del         = require('del');

// Path
var paths = {
  html:     'src/index.html',
  scripts:  'src/assets/js/*.js',
  styles:   'src/assets/styles/*.sass',
  fonts:   'src/fonts/*.otf',
  images:   'src/assets/images/*.*',
};

// Environment
var env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// Clean
gulp.task('clean', function () {
  return del(['build', 'dist']);
});

// Styles
gulp.task('styles', function () {
  var dev = env === 'development';
  return gulp.src(paths.styles)
    .pipe(sass())
    .on('error', notify.onError(function (err) {
      return err.message;
    }))
    .pipe(dev ? util.noop() : rename({ suffix: '.min' }))
    .pipe(dev ? util.noop() : minifyCSS())
    .pipe(gulp.dest(dev ? 'build/css' : 'dist/css'));
});

// Scripts
gulp.task('scripts', function () {
  var dev = env === 'development';
  return gulp.src(paths.scripts)
    .on('error', notify.onError(function (err) {
      return err.message;
    }))
    .pipe(browserify({ insertGlobals: true }))
    .pipe(dev ? util.noop() : uglify())
    .pipe(dev ? util.noop() : concat('main.js'))
    .pipe(dev ? util.noop() : rename({ suffix: '.min' }))
    .pipe(gulp.dest(dev ? 'build/js' : 'dist/js'));
});

// Images
gulp.task('images', function () {
  var dev = env === 'development';
  return gulp.src(paths.images)
    //.pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(dev ? 'build/images' : 'dist/images'));
});

// Html
gulp.task('html', function () {
  var dev = env === 'development';
  return gulp.src(paths.html)
    .pipe(gulp.dest(dev ? 'build/' : 'dist/'));
});

// Fonts
gulp.task('fonts', function () {
  var dev = env === 'development';
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(dev ? 'build/font' : 'dist/font'));
});

// Html injection
gulp.task('injection', function () {
  var dev = env === 'development';
  return gulp.src(dev ? 'build/index.html' : 'dist/index.html')
    .pipe(inject(gulp.src([dev ? 'build/js/*.js' : 'dist/js/*.js'], { read: false }), { relative: true }))
    .pipe(inject(gulp.src([dev ? 'build/css/*.css' : 'dist/css/*.css'], { read: false }), { relative: true }))
    .pipe(gulp.dest(dev ? 'build/' : 'dist/'));
});

// Watch
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.html, ['html']);
});

// Server
gulp.task('server', function () {
  var dev = env === 'development';
  return gulp.src(dev ? './build/' : './dist/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false,
    }));
});

//TODO: Fix envoriment to deploy
gulp.task('default', function (cb) {
  return sequence(['clean'], 'styles', 'scripts', 'images', 'fonts', 'html', ['injection', 'watch', 'server'], cb);
});
