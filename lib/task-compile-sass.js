const utils = require('./utils');
const getConfig = require('../lib/config-handler');

module.exports = function(
    gulp,
    sourcemaps,
    sass,
    minifyCSS,
    rename,
    browserSync
) {
    return gulp.src('{0}/{1}'.formatUnicorn(
        getConfig('source.base'),
        getConfig('source.files.container')
    ))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename(getConfig('distribution.file')))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('{0}/'.formatUnicorn(
            getConfig('distribution.base')
        )))
        .pipe(browserSync.stream({match: '**/*.css' }))
        ;
};