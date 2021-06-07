const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function() {

    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// SASS Compiler
gulp.task('styles', function() {
    return gulp.src('src/sass/*.+(scss|sass)')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.stream());
});


//Watch files
gulp.task('watch' , function() {
    gulp.watch('src/sass/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

//Optimization HTML and moving on dist
gulp.task('html' , function() {
    return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});


//Moving js files on dist
gulp.task('scripts' , function() {
    return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
});

//Moving fonts on dist
gulp.task('fonts' , function() {
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

//Moving icons on dist
gulp.task('icons' , function() {
    return gulp.src('src/icons/**/*')
    .pipe(gulp.dest('dist/icons'));
});

//Optimization images and moving on dist
gulp.task('images' , function() {
    return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});


// starting GULP
gulp.task('default' , gulp.parallel('watch','server','styles', 'html', 'scripts', 'fonts' , 'icons', 'images'));
