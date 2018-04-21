var utils = require('./utils');
var config = require('../cnf/config.json');

module.exports = function(
    browserSync
) {

    const serverOptions = {
        proxy: config.browser.proxy,
        open: false
    };

    browserSync.init(serverOptions);

};