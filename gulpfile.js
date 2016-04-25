var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

var config = {
    ts: [
        'src/canvasDrawer.ts',
        'src/sqlGenerator.ts',
        'src/uiController.ts',
        'src/designer.ts',
    ],
    tasks: {
        default: ['clean', 'build', 'build ts', 'copy html', 'copy css', 'copy assets'],
        dev: ['clean','build dev', 'build ts', 'copy html', 'copy css', 'copy assets','watch']
    }
}

gulp.task('clean', function(){
    return del(['dist/js/db-designer.js', 'dist/ts/db-designer.ts']);
});

gulp.task('build', function(){
    return gulp.src(config.ts)
        .pipe(typescript({ sortOutput:true, target: "ES5" }))
        .pipe(uglify())
        .pipe(concat('db-designer.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build dev', function(){
    return gulp.src(config.ts)
        .pipe(typescript({ target: "ES5" }))
        .pipe(concat('db-designer.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build ts', function(){
    return gulp.src(config.ts)
        .pipe(concat('db-designer.ts'))
        .pipe(gulp.dest('dist/ts'));
});

gulp.task('copy html', function(){
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('copy css', function(){
    gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css'))
});

gulp.task('copy assets', function(){
    gulp.src('src/assets/**')
    .pipe(gulp.dest('dist/assets'))
});

gulp.task('watch', function() {
  gulp.watch(['src/**/*.ts', 'src/*.html', 'src/css/*.css'], ['dev']);
});



gulp.task('default', config.tasks.default);
gulp.task('dev', config.tasks.dev);