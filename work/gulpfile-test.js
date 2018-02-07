var projectURL = 'http://playground.local'; // Local project URL of your already running WordPress site. Could be something like local.dev or localhost:8888.
var styleSRC = 'scss/style.scss'; // Path to main .scss file.
var styleDestination = ''; // Path to place the compiled CSS file.

var jsSRC = 'js/vendor/*.js'; // Path to all vendor JS files.
var jsDestination = 'js/vendor/'
// Watch files paths.
var styleWatchFiles = 'scss/**/*.scss'; // Path to all *.scss files inside css folder and inside them.

// Load plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('styles', function () {
    return gulp.src(styleSRC)
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compact',
            precision: 10
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest(styleDestination))
        .pipe(browserSync.stream({match: '**/*.css'})) // Reloads style.css if that is enqueued.
});

gulp.task('js-stuff', function () {
    // HINT: here you would place all of your js related tasks, e.g. minification
    return gulp.src(jsSRC)
        .pipe(gulp.dest(jsDestination));
});


gulp.task('reload-js', ['js-stuff'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('watch', function () {
    gulp.watch(styleWatchFiles, ['styles']); // Reload on SCSS file changes.
    gulp.watch(['src/js/**/*'], ['reload-js']);
});

gulp.task('default', [
    'styles',
    'watch'
], function () {
    browserSync.init({
        proxy: projectURL,
        open: true
    });
});