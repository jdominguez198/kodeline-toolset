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
        .replace('{{CONFIG_BROWSERSYNC_PORT}}', config.browsersync_port)
        .replace('{{CONFIG_THEME_LOCATION}}', config.theme_location)
        .replace('{{CONFIG_THEME_NAME}}', config.theme_name);

};
