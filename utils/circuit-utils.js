const Discord = require("discord.js");


//Misc

//Generates a random whole number between the min and max.
exports.genRandomWhole = (min, max) => {
    return Math.random() * (min - max) + min;
}

//Gets random item from array.
exports.gra = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

//Returns true or false, max number changes the chance of true.
exports.genRandomTest = (max) => {
    var number = Math.floor(Math.random() * max);
    if (number == 0) return true;
    else return false;
    
}


//Returns random user from that server.
exports.getRandomUserID = (message) => {
    var userIDs = message.guild.members.map ((val, index, arr) => {
        return val.user.id;
    });
    return exports.getRandomArray(userIDs);
}





//Enmap part of utils -------------------------------------------------------------------------------------

const e = require('enmap');
const EnmapLevel = require('enmap-level');

var enmap = new e({ provider: new EnmapLevel({ name: 'serverUsersDB' }) });

//Sets a value in the database.
exports.eSet = (key, value) => {
    enmap.set(key, value);
}

//Gets a value in the database.
exports.eGet = (key) => {
    return enmap.get(key);
}

//Maps all of a server's users for easy access.
exports.mapUsersServer = (guildID) => {
    var users = enmap.map ((val, index, arr) => {
        if (index.startsWith(guildID)) {
            return val;
        }
        else return;
    });

    return users;

}


//End



//XP Utils ----------------------------------------------------------------------------------------
const levelConfig = require("../levelConfig.json");


//Add default user database template
exports.addNewUser = (msg) => {
    exports.eSet(msg.userDatabaseID, {
        userID: msg.userID,
        username: msg.username,
        guildID: msg.guild.id,
        xp: 0,
        level: 0
    });

}

//Fetch a user's stats from the database.
exports.fetchStats = (msg) => {
    try {
    //Get and return user stats from Database.
       var stats = exports.eGet(msg.userDatabaseID);
       return stats;
    }
    
    //If the user doesn't exist, just end and let the code add a new user.
    catch(err) {
        console.log("User does not exist, adding.");
    }
}

//Update user's XP count/level.
exports.updateXP = (userDatabaseID) => {
    var data = [];
    var xpToAdd = 1;
    var userDatabase = exports.eGet(userDatabaseID);

    //Give user 1 XP.
    userDatabase.xp += xpToAdd;
    exports.eSet(userDatabaseID, userDatabase)

    //Test if user leveled up.
    if (levelConfig[userDatabase.level + 1] <= userDatabase.xp) {
        userDatabase.level += 1;
        exports.eSet(userDatabaseID, userDatabase);
        return data = [true, (userDatabase.level + 1).toString()];
    }
    else return data = [false, userDatabase.level.toString()];


}





//End



