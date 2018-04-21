var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    gulp,
    sourcemaps,
    sass,
    minifyCSS,
    rename,
    browserSync
) {
    return gulp.src('{0}/{1}'.formatUnicorn(
        config.source.base,
        config.source.files.container
    ))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename(config.distribution.file))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('{0}/'.formatUnicorn(
            config.distribution.base
        )))
        .pipe(browserSync.reload({
            stream: true
        }))
        ;
};