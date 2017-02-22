
const gulp = require('gulp'), 
sass = require('gulp-sass'), 
autoprefixer = require('gulp-autoprefixer'), 
concat = require('gulp-concat'), 
minify = require('gulp-minify'),
run = require('gulp-run');

const pathScss = './scss/';
const pathJss = './js/';
const pathPublic = './public/';
const public = './../dist/';
var jsFiles = ['jquery-3.1.1.min.js',
                'app.js'];



/*----------  Incluir scripts  ----------*/
var js = [];
for(var i in jsFiles){
  js.push(pathJss+jsFiles[i]);
}

/*----------  Compilar SASS  ----------*/
gulp.task('sass', ['copy'], ()=>
	gulp.src(pathScss+'bundle.scss').on('error', handleError)
	.pipe(sass({ outputStyle:'expended'})).on('error', handleError)
	.pipe(autoprefixer({versions:['last 5 browsers']})).on('error', handleError)
	.pipe(gulp.dest(public+'css/'))
    
);
/*----------  Concatenar JS  ----------*/
gulp.task('js', ['copy'], ()=>{
    gulp.src(js)
    .pipe(concat('bundle.js')).on('error', handleError)
    .pipe(gulp.dest(public+'js/'))
    /////////
});

/*----------  Copiar archivos de public  ----------*/
gulp.task('copy', function() {
   gulp.src('./public/**/*')
   .pipe(gulp.dest(public));
});

/*----------  Vigilar JS, CSS Y SASS  ----------*/
gulp.task('watch', () => {
  gulp.watch(pathScss+'**/*.scss',['sass']);
  gulp.watch(pathJss+'**/*.js',['js']);
  gulp.watch(pathPublic+'**/*.*',['copy']);
});
gulp.task('default', ['sass','copy','js','watch']);

/*----------  Errores al compilar  ----------*/
function handleError(err){
   var cmd = new run.Command("terminal-notifier -title 'Error' -message 'Revisar código!'");
    cmd.exec();
    console.log(err.toString());
    this.emit('end');
}
