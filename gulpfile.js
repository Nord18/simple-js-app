let gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css')
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

let path = {

    build: {
        js: 'js/',
        css: 'css/'
    },

    src: {
        js: 'src/js/app.js',
        scss: 'src/scss/app.scss',
        html: '*.html',
        img: 'images/*'
    },

    watch: {
        js: 'src/js/*.js',
        scss: 'src/scss/*.scss',
        html: '*.html',
        img: 'images/*'
    }
};

gulp.task('js:build', () => {
     gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});

gulp.task('scss:build', () => {
     gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(prefixer({
        	browsers: ['last 2 versions', 'ie >= 9', 'android >= 4.4', 'ios >= 7']
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename('app.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('html:watch', () => {
    gulp.src(path.src.html)
    .pipe(browserSync.stream());
});

gulp.task('img:build', () => {
    gulp.src(path.src.img)
    .pipe(imagemin())
    .pipe(browserSync.stream());
});

gulp.task('build', [
    'js:build',
    'scss:build',
    'html:watch',
    'img:build'
]);

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(path.src.scss);
    gulp.watch(path.src.js);
    gulp.watch(path.src.html);
    gulp.watch(path.src.img);
});

gulp.task('watch', () => {
    watch([path.watch.scss],(event, cb) => {
        gulp.start('scss:build');
    });
    watch([path.watch.js],(event, cb) => {
        gulp.start('js:build');
    });
    watch([path.watch.html],(event, cb) => {
        gulp.start('html:watch');
    });
    watch([path.watch.img],(event, cb) => {
        gulp.start('img:build');
    });
});

gulp.task('default', ['build', 'watch', 'browser-sync']);