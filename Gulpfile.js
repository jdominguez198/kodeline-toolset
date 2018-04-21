// Dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const inject = require('gulp-inject');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Utils & Config
const utils = require('./lib/utils');
const config = require('./cnf/config.json');

// Tasks sources
const taskInjectSass = require('./lib/task-inject-sass');
const taskCompileSass = require('./lib/task-compile-sass');
const taskBrowserSync = require('./lib/task-browsersync');

// Tasks names
const TASK_INJECT_SASS = 'inject-imports-sass';
const TASK_COMPILE_SASS = 'compile-sass';
const TASK_BROWSER_SYNC = 'browserSync';


// Task to inject the sass multiple files into one, on an specific order
gulp.task(TASK_INJECT_SASS, function() {
    return taskInjectSass( gulp, inject );
});

// Task to compile the .scss files and generate the styles.css
gulp.task(TASK_COMPILE_SASS, function() {
    return taskCompileSass( gulp, sourcemaps, sass, minifyCSS, rename, browserSync );
});

// Task to listen to changes
gulp.task(TASK_BROWSER_SYNC, function() {
    taskBrowserSync( browserSync );
});

// Main task, the watcher and execution of all previous tasks
gulp.task(
    'default',
    [ TASK_INJECT_SASS, TASK_COMPILE_SASS, TASK_BROWSER_SYNC ],
    function() {

        gulp.watch(
            [ '**/*.scss', '*/*.scss' ],
            { cwd: config.source.base },
            [ TASK_INJECT_SASS, TASK_COMPILE_SASS ]
        );

    }
);