/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

//process.env.DISABLE_NOTIFIER = true;

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    using = require('gulp-using'),
    livereload = require('gulp-livereload'),
    del = require('del');

// HTML
gulp.task('gen-html', function () {
    return gulp.src(['app/header.html', 'app/app.html', 'app/components/**/*.html', 'app/footer.html'])
        .pipe(using())
        .pipe(concat('index.html'))
        .pipe(gulp.dest('release'));
        //.pipe(notify({message: 'Generated App HTML'}));
});

gulp.task('gen-css', function () {
    return sass('app/app.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifycss())
        .pipe(gulp.dest('release'));
        //.pipe(notify({message: 'Generated App CSS'}));
});

gulp.task('gen-bower-css', function () {
    return gulp.src('app/bower-components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(concat('bower.css'))
        .pipe(gulp.dest('release/'));
        //.pipe(notify({message: 'Generated Bower CSS'}));
});

// Scripts
gulp.task('gen-bower-js', function () {
    return gulp.src([
        'app/bower-components/jquery/dist/jquery.min.js',
        'app/bower-components/underscore/underscore-min.js',
        'app/bower-components/velocity/velocity.min.js',
        'app/bower-components/velocity/velocity.ui.js',
        'app/bower-components/angular/angular.min.js'
    ])
        .pipe(concat('bower.js'))
        .pipe(gulp.dest('release/'));
        //.pipe(notify({message: 'Generated Bower JS'}));
});

// Scripts
gulp.task('gen-js', function () {
    return gulp.src(['app/app.js', 'app/components/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(jsx())
        .pipe(gulp.dest('release/'));
        //.pipe(notify({message: 'Scripts task complete'}));
});

// Images
gulp.task('gen-img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('release/img'));
        //.pipe(notify({message: 'Images task complete'}));
});

// Clean
gulp.task('clean', function (cb) {
    del(['release'], cb)
});

// Default task
gulp.task('default', ['clean'], function () {
    //gulp.start('styles', 'scripts', 'images');
    gulp.start(['gen-html', 'gen-css', 'gen-js', 'gen-bower-css', 'gen-img', 'gen-bower-css', 'gen-bower-js']);
});

// Watch
gulp.task('watch', ['default'], function () {

    // Watch .scss files
    gulp.watch('app/components/**/*.js', ['default']);
    gulp.watch('app/**/*.scss', ['default']);
    gulp.watch('app/**/*.html', ['default']);


});