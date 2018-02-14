
var gulp = require('gulp');
var critical = require('critical');
var imagemin = require('gulp-imagemin');
// var uncss = require( 'gulp-uncss' ); Not necessary, breaks css
var concat = require('gulp-concat');
var url = "https://www.lodenvision.com/landing/lasik-landing-staging/" //CHANGE THIS TO WHATEVER YOU NEED
gulp.task( 'critical', function(){
  critical.generate({
    base: 'src',
    inline: true,
    src: 'index.html',
    css: ['dist/css/main.css' ],
    dimensions: [{
      height:1440,
      width:2560,
    }, {
      height:1080,
      width:1920,
    }, {
      height: 1024,
      width: 768
    }, {
      height: 667,
      width: 375
    }],
    dest: '../dist/index.html',
    ignore: ['@font-face', /url\(/],
      minify: true

    })
  })
  gulp.task( 'concat', function(){
    return gulp.src( 'src/css/**/*.css' )
    .pipe(concat('main.css'))
    .pipe(gulp.dest( 'dist/css/' ))
  })
  gulp.task( 'concat-scripts', function(){
    return gulp.src( 'src/js/**/*.js' )
    .pipe(concat('all.js'))
    .pipe(gulp.dest( 'dist/js/' ))
  })
  gulp.task('imagemin', () =>
  gulp.src(['src/**/*', '!src/**/*.js', '!src/**/*.css', '!src/**/*.scss'])
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({plugins: [{removeViewBox: true}]})
  ]))
  .pipe(gulp.dest('dist/'))
)
gulp.task('default', function() {
  gulp.task( 'imagemin' );
  gulp.task( 'concat' );
  gulp.task( 'concat-scripts' );
  gulp.task( 'critical' );
});
gulp.task( 'watch', function() {
  gulp.watch( ['src/css/**/*.css', '!dist/**/*.css'], ['uncss', 'critical'] ); //TODO: REVISE SO THAT GULP DOESN'T LOOP. - SOLVED
} )
