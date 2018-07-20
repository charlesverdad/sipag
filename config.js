var config = {};
const utils = require('./utils')

config.appPath = utils.getAppPath();
config.dataPath = utils.getAppDataPath();
config.saveInterval = 10; // Interval to write data to json file.

module.exports = config;