//const e = require('enmap');
//const EnmapLevel = require('enmap-level');

// Load Enmap
const enmap = require('enmap');
 
// Load EnmapRethink
const EnmapLevel = require('enmap-level');


const usersLevel = new EnmapLevel({ 
    name: 'users'
});

const configsLevel = new EnmapLevel({ 
    name: 'configs'
});



const users = new enmap({ provider: usersLevel });
const configs = new enmap({ provider: configsLevel });



exports.set = (key, value) => {
    users.set(key, value);
}

exports.get = (key) => {
    return users.get(key);
}

exports.configSet = (key, value) => {
    configs.set(key, value);
}

exports.configGet = (key) => {
    return configs.get(key);
}

exports.loadConfigs = () => {
    var configData = {};
    var i = 0;
    configs.map ((val, index, arr) => {
        i++;
        configData[index] = val;
    });
    console.log(`Getting configs from ${i} guilds.`)
    return configData;
}