const e = require('enmap');
const EnmapLevel = require('enmap-level');

var enmap = new e({ provider: new EnmapLevel({ name: 'serverUsersDB' }) });


exports.set = (key, value) => {
    enmap.set(key, value);
}

exports.get = (key) => {
    return enmap.get(key);
}