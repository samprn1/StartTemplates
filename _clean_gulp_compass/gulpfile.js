var gulp         			= require('gulp'),
		sass        		 = require('gulp-sass'),
		compass 		= require('gulp-compass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create();

gulp.task('browser-sync', ['compass'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('compass', function() {
  gulp.src('scss/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'app/css/',
      sass: 'scss/'
    }))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss())
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	//gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('scss/*.scss', ['compass']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
