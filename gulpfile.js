/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

// HTML
gulp.task('gen-html', function() {
    return gulp.src(['app/header.html', 'app/app.html', 'app/components/**/*.html', 'app/footer.html'])
        .pipe(concat('app.html'))
        .pipe(gulp.dest('release'))
        .pipe(notify({ message: 'Generated App HTML' }));
});

gulp.task('gen-css', function() {
    return sass('app/app.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        //.pipe(gulp.dest('release'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('release'))
        .pipe(notify({ message: 'Generated App CSS' }));
});

gulp.task('gen-bower-css', function() {
    return gulp.src('app/bower-components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(concat('bower.css'))
        .pipe(gulp.dest('release/'))
        .pipe(notify({ message: 'Generated Bower CSS' }));
});

// Scripts
gulp.task('gen-js', function() {
    return gulp.src('app/app.js', 'app/components/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('release/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('release/'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('gen-img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('release/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['release'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    //gulp.start('styles', 'scripts', 'images');
    gulp.start(['gen-html', 'gen-css', 'gen-bower-css', 'gen-img']);
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('app/**/*.scss', ['default']);
    gulp.watch('app/**/*.html', ['default']);

    // Watch .js files
    //gulp.watch('app/**/*.js', ['scripts']);

    // Watch image files
    //gulp.watch('src/images/**/*', ['images']);

    // Create LiveReload server
    //livereload.listen();

    // Watch any files in dist/, reload on change
    //gulp.watch(['dist/**']).on('change', livereload.changed);

});