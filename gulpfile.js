'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

// Так же создадим js объект в который пропишем все нужные нам пути, чтобы при необходимости легко в одном месте их редактировать:

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

//Создадим переменную с настройками нашего dev сервера:

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};

// Напишем таск для сборки html:

gulp.task('html:build', function () {
    return gulp.src,
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

// JS

gulp.task('js:build', function () {
    return gulp.src,
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

// Напишем задачу для сборки нашего SCSS:

gulp.task('style:build', function () {
    return gulp.src,
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

// Таск по картинкам будет выглядеть так:

gulp.task('image:build', function () {
    return gulp.src,
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

// Шрифты


gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', gulp.series( 
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
  ));
  gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
      gulp.parallel('html:build');
    });
  });
  gulp.task('watch', function(done){
    gulp.watch([path.watch.html], gulp.series('html:build')),
    gulp.watch([path.watch.style], gulp.series('style:build')),
    gulp.watch([path.watch.js], gulp.series('js:build')),
    gulp.watch([path.watch.img], gulp.series('image:build')),
    gulp.watch([path.watch.fonts], gulp.series('fonts:build')),
    done();
  });
  gulp.task('webserver', function () {
    browserSync(config);
  });
  
  gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
  });
  
  gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));