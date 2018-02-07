var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass',function(){
    return gulp.src('scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))

});