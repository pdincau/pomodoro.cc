var config = require('../config')
var gulp = require('gulp')
  , browserSync = require('browser-sync')

gulp.task('assets', function(){
  gulp.src('src/favicon.ico')
    .pipe(gulp.dest('www/'))
  gulp.src('src/sitemap.xml')
    .pipe(gulp.dest('www/'))
  gulp.src('src/robots.txt')
    .pipe(gulp.dest('www/'))
  gulp.src(config.paths.assets)
    .pipe(gulp.dest('www/assets/'))
    .pipe(browserSync.reload({stream:true}))
})
