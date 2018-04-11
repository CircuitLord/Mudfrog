const e = require('enmap');
const EnmapLevel = require('enmap-level');

var enmap = new e({ provider: new EnmapLevel({ name: 'serverUsersDB' }) });


exports.set = (key, value) => {
    enmap.set(key, value);
}

exports.get = (key) => {
    return enmap.get(key);
}


exports.mapUsersServer = (guildID) => {

    //var val, index, arr;
    var users = enmap.map ((val, index, arr) => {
        if (index.startsWith(guildID)) {
            //console.log("true")
            return val;
        }
      
        else return;
    });

    return users;

}