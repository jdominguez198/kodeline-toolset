// Dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const sourcemaps = require('gulp-sourcemaps');

// Utils & Config
const utils = require('./lib/utils');
const config = require('./cnf/config.json');

// Tasks
const taskInjectSass = require('./lib/task-inject-sass');
const taskCompileSass = require('./lib/task-compile-sass');

// Constans
const TASK_INJECT_SASS = 'inject-imports-sass';
const TASK_COMPILE_SASS = 'compile-sass';

// Task to inject the sass multiple files into one, on an specific order
gulp.task(TASK_INJECT_SASS, function() {
    return taskInjectSass( gulp, inject );
});

// Task to compile the .scss files and generate the styles.css
gulp.task(TASK_COMPILE_SASS, function() {
    return taskCompileSass( gulp, sourcemaps, sass, minifyCSS, rename );
});

// Main task, the watcher and execution of all previous tasks
gulp.task(
    'default',
    [ TASK_INJECT_SASS, TASK_COMPILE_SASS ],
    function() {

        gulp.watch([
            '{0}/**/*.scss'.formatUnicorn(
                config.source.base
            ),
            '{0}/*.scss'.formatUnicorn(
                config.source.base
            )
        ], [ TASK_INJECT_SASS, TASK_COMPILE_SASS ]);

    }
);