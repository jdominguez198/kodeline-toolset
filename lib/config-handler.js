const includes = require('../cnf/includes.json');
const config = require('../cnf/config.json');

const getConfig = function(key, defaultValue = null, dataSource = null) {

    if (dataSource === null) {
        dataSource = includes;
    }

    const tree = key.split('.');
    const dataSourceKeys = Object.keys(dataSource);
    if (tree.length === 1) {
        if (dataSourceKeys.indexOf(tree[0]) !== -1) {
            return dataSource[tree[0]];
        }
    } else {
        const firstKey = tree.shift();
        if (dataSourceKeys.indexOf(firstKey) !== -1) {
            return getConfig(tree.join('.'), defaultValue, dataSource[firstKey]);
        }
    }

    return defaultValue;

};

module.exports = function(key, defaultValue = null) {

    return getConfig(key, defaultValue)
        .replace('{{CONFIG_PUBLIC_URL}}', config.public_url)
        .replace('{{CONFIG_PROXY_URL}}', config.site_proxy_url)
        .replace('{{CONFIG_BROWSERSYNC_PORT}}', config.browsersync_port)
        .replace('{{CONFIG_BROWSERSYNC_ADMIN_PORT}}', config.browsersync_admin_port)
        .replace('{{CONFIG_CSS_DIST_FILENAME}}', config.css_dist_filename)
        .replace('{{SITE_ASSETS_RELATIVE_PATH}}', config.site_assets_relative_path)
        .replace('{{SITE_BASE_PATH}}', config.site_base_path)
    ;

};
