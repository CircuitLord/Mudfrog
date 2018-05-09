const Discord = require("discord.js");
const utils = require("../utils/circuit-utils.js");




exports.run = (msg) => {

    var userData = utils.eGet(msg.userDatabaseID);

    function compare(a, b) {
        if (a.xp < b.xp) return 1;
        if (a.xp > b.xp) return -1
        else return 0;
    }

    var serverUsers = msg.guild.members()



}