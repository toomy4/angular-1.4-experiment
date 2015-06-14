var uiVersion = '1.0';

// core tools
var gulp = require('gulp'),
    es = require('event-stream'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del')
    ;

// ts -> js tools (d.ts download, ts compile -> merge -> uglify -> test)
var ts = require('gulp-typescript')
    , traceur = require('gulp-traceur')
    , tslint = require('gulp-tslint')
    , tsd = require('gulp-tsd')
    , source = require('gulp-sourcemaps')
    , jasmine = require('gulp-jasmine')
    , uglify = require('gulp-uglify')
    ;

// template tools (jade -> html -> minify -> cdn refs)
var jade = require('gulp-jade'),
    minify = require('gulp-minify-html'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css')
    ;

var
    mainPath = 'src/app/Application.ts',
    tsPath = 'src/app/*/**/*.ts',
    dtsPath = 'tools/typings/**/*.d.ts',
    indexTplPath = 'src/app/index.jade',
    tplPath = 'src/app/*/**/*.jade',
    testPath = 'src/test/**/*.js',
    compilePath = 'build';


gulp.task('index', function () {
    return gulp.src(indexTplPath)
        .pipe(jade())
        .pipe(minify())
        .pipe(gulp.dest(compilePath + '/app'));
});

gulp.task('templates', function () {
    return gulp.src(tplPath)
        .pipe(jade())
        .pipe(minify())
        .pipe(gulp.dest(compilePath + '/app/' + uiVersion));
});


gulp.task('tsd', function () {
    return tsd({
        command: 'reinstall',
        config: 'tsd.json'
    }, function (evt) {
        console.log(evt);
    });
});

var tsProject = ts.createProject({
    target: 'ES6',
    sortOutput: true,
    declarationFiles: true,
    noExternalResolve: true
});

gulp.task('ts', function () {
    var main = gulp.src([mainPath, dtsPath]),
        content = gulp.src([tsPath, dtsPath]);

    return es.merge(main, content)
        .pipe(tslint())
        .pipe(source.init())
        .pipe(ts(tsProject))
        .js
        .pipe(traceur({types: true}))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(compilePath + '/app/' + uiVersion))
        .pipe(uglify({mangle: true}))
        .pipe(rename('app.min.js'))
        .pipe(source.write('../../source'))
        .pipe(gulp.dest(compilePath + '/app/' + uiVersion))
        ;
});

gulp.task('libs', function () {
    return gulp.src([
        'bower_components/*/*.js',
        'bower_components/*/dist/*.js',
        'bower_components/*/*.css'
    ])
        .pipe(gulp.dest(compilePath + '/app/' + uiVersion + '/lib'));
});

gulp.task('boot', function () {
    var lab = gulp.src('lib/lab/LAB.min.js'),
        boot = gulp.src('src/app/boot.js');

    return es.merge(lab, boot)
        .pipe(concat('boot.js'))
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest(compilePath + '/app/' + uiVersion));
});

gulp.task('gfx', function () {
    return gulp.src('src/app/img/**').pipe(gulp.dest(compilePath + '/app/' + uiVersion + '/img'));
});

gulp.task('css', function () {
    return gulp.src('src/app/**/*.less')
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest(compilePath + '/app/' + uiVersion));
});


gulp.task('clean', function (cb) {
    del(['build'], cb);
});

gulp.task('watch', ['default'], function () {
    gulp.watch(['src/app/index.jade'], ['index']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running index template task ...');
    });
    gulp.watch(['src/app/boot.js'], ['boot']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running boot script task ...');
    });
    gulp.watch(['src/app/**/*.less'], ['css']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running css task ...');
    });
    gulp.watch([mainPath, tsPath, testPath], ['ts', 'test']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running TS tasks ...');
    });
    gulp.watch([tplPath], ['templates']).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running Jade tasks...');
    });
});

gulp.task('build', ['libs', 'index', 'boot', 'gfx', 'css', 'ts', 'templates']);

gulp.task('test', ['ts'], function () {
    return gulp.src(testPath).pipe(jasmine());
});


gulp.task('default', ['build', 'test']);

