const e = require('enmap');
const EnmapLevel = require('enmap-level');


var users = new e({ provider: new EnmapLevel({ name: 'usersDB' }) });

var serverConfigs = new e({ provider: new EnmapLevel({ name: 'serverConfigs' }) });




exports.set = (key, value) => {
    enmap.set(key, value);
}

exports.get = (key) => {
    return enmap.get(key);
}

exports.configSet = (key, value) => {
    serverConfigs.set(key, value);
}

exports.configGet = (key) => {
    return serverConfigs.get(key);
}

exports.loadConfigs = () => {
    var configData = {};
    var i = 0;
    serverConfigs.map ((val, index, arr) => {
        i++;
        configData[index] = val;
    });
    console.log(`Getting configs from ${i} guilds.`)
    return configData;
}