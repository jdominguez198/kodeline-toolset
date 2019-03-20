const getConfig = require('../lib/config-handler');

module.exports = function(
    browserSync
) {

    const serverOptions = {
        open: false
    };

    const browserProxy = getConfig('browser.proxy');
    const browserPort = getConfig('browser.port');
    const browserAdminPort = getConfig('browser.admin_port');

    if (browserProxy !== null) {
        serverOptions.proxy = browserProxy;
    }

    if (browserPort !== null) {
        serverOptions.port = parseInt(browserPort);
    }

    if (browserAdminPort !== null) {
        if (browserAdminPort === false) {
            serverOptions.ui = false;
        } else {
            serverOptions.ui = {
                port: parseInt(browserAdminPort),
            };
        }
    }

    browserSync.init(serverOptions);

};
