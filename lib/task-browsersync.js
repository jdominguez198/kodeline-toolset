const getConfig = require('../lib/config-handler');

module.exports = function(
    browserSync
) {

    const serverOptions = {
        proxy: getConfig('browser.proxy'),
        port: getConfig('browser.port'),
        ui: {
            port: getConfig('browser.admin_port'),
        },
        open: false
    };

    browserSync.init(serverOptions);

};
