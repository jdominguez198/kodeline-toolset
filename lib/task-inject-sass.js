var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    gulp,
    inject
) {
    return gulp.src('{0}/{1}'.formatUnicorn(
        config.source.base,
        config.source.files.container
    ))
    .pipe(inject(
        gulp.src('{0}/**/*.scss'.formatUnicorn(
            config.source.base
            ), { read: false }
        ),
        {
            starttag: '/* inject:scss */',
            endtag: '/* endinject */',
            relative: true,
            transform: function(filepath) {
                if (filepath !== config.source.files.container) {
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
            config.source.base,
            config.source.folders.core
            ), { read: false }
        ),
        {
            starttag: '/* inject:core:scss */',
            endtag: '/* endinject:core */',
            relative: true,
            transform: function(filepath) {
                if (filepath !== config.source.files.container) {
                    return '@import "' + filepath + '";';
                }
            }
        }
    ))
    .pipe(inject(
        gulp.src('{0}/{1}/*.scss'.formatUnicorn(
            config.source.base,
            config.source.folders.mixins
            ), { read: false }
        ),
        {
            starttag: '/* inject:mixins:scss */',
            endtag: '/* endinject:mixins */',
            relative: true,
            transform: function(filepath) {
                if (filepath !== config.source.files.container) {
                    return '@import "' + filepath + '";';
                }
            }
        }
    ))
    .pipe(gulp.dest('{0}'.formatUnicorn(
        config.source.base
    )));
};