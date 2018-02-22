const rc = require('rc');
const config = Object.create(null);

rc('app', config);

module.exports = config;
