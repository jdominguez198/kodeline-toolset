const utils = require('./utils');
const getConfig = require('../lib/config-handler');


module.exports = function(
    gulp,
    inject
) {
    return gulp.src('{0}/{1}'.formatUnicorn(
        getConfig('source.base'),
        getConfig('source.files.container')
    ))
    .pipe(inject(
        gulp.src('{0}/**/*.scss'.formatUnicorn(
            getConfig('source.base')
            ), { read: false }
        ),
        {
            starttag: '/* inject:scss */',
            endtag: '/* endinject */',
            relative: true,
            transform: function(filepath) {
                if (filepath !== getConfig('source.files.container')) {
                    var _path = filepath.split('/');
                    if (['core', 'mixins'].indexOf(_path[0]) === -1) {
                        return '@import "' + filepath + '";';
                    }
                }
            }
        }
    ))
    .pipe(inject(
        gulp.src('{0}/{1}/*.scss'.formatUnicorn(
            getConfig('source.base'),
            getConfig('source.folders.core')
            ), { read: false }
        ),
        {
            starttag: '/* inject:core:scss */',
            endtag: '/* endinject:core */',
            relative: true,
            transform: function(filepath) {
                if (filepath !== getConfig('source.files.container')) {
                    return '@import "' + filepath + '";';
                }
            }
        }
    ))
    .pipe(inject(
        gulp.src('{0}/{1}/*.scss'.formatUnicorn(
            getConfig('source.base'),
            getConfig('source.folders.mixins')
            ), { read: false }
        ),
        {
            starttag: '/* inject:mixins:scss */',
            endtag: '/* endinject:mixins */',
            relative: true,
            transform: function(filepath) {
                if (filepath !== getConfig('source.files.container')) {
                    return '@import "' + filepath + '";';
                }
            }
        }
    ))
    .pipe(gulp.dest('{0}'.formatUnicorn(
        getConfig('source.base')
    )));
};