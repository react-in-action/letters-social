require('@std/esm');
require('babel-register');
try {
    module.exports = require('./server/run');
} catch (err) {
    console.error(err);
}
