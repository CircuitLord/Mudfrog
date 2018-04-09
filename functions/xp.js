
const enmap = require("../enmap/enmap.js");
const config = require("../config.json");

var xpToAdd = 1;














exports.addNewUser = (userID, username, guildID, userDatabaseID) => {
    enmap.set(userDatabaseID, {
        userID: userID,
        username: username,
        guildID: guildID,
        xp: 0,
        level: 0
    });

}


exports.fetchStats = (userDatabaseID) => {
    try {
       var stats = enmap.get(userDatabaseID);
       return stats;
    }
    catch(err) {
        console.log("User does not exist, adding.")
    }
}


exports.update = (userDatabaseID) => {

    var userDatabase = enmap.get(userDatabaseID);

    userDatabase.xp += xpToAdd;

    enmap.set(userDatabaseID, userDatabase)


}