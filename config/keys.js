//keys.js figure out what set of credential to use

if (process.env.NODE_ENV === 'production') {
    //return prod set of keys
    module.exports = require('./prod');
} else {
    // we are in dev return dev set of keys
    module.exports = require('./dev');
}