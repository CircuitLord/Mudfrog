const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

const xp = require("./functions/xp.js");

var usersGotXP = [];









client.on("ready", function(message) {
    console.log("Let's do this!");
    xpTimer();
  });



function xpTimer() {
    usersGotXP = [];
    setTimeout(xpTimer, 60000);
}



client.on("message", function(message) {
    if (message.author.bot == true) return;
    

    const username = message.author.username;
    const guildID = message.guild.id.toString();
    const userID = message.author.id.toString();
    const content = message.content;
    const channel = message.channel;

    const userDatabaseID = (guildID + "-" + userID);

    var command = "";

    var isCommand = false;
    if (content.startsWith("-")) {
        const args = message.content.slice(1).trim().split(/ +/g);
        command = args.shift().toLowerCase();
        
        isCommand = true;
    }
    //console.log(xp.fetchStats(userDatabaseID))

    if (usersGotXP.includes(userDatabaseID) == false && xp.fetchStats(userDatabaseID) == null) {
        xp.addNewUser(userID, username, guildID, userDatabaseID);
        console.log("New user.")
        return;
    }

    if (usersGotXP.includes(userDatabaseID) == false && isCommand == false) {
        console.log("Giving xp")
        //Update user XP, and test if they leveled up.
        var leveledUp = xp.update(userDatabaseID);
        //usersGotXP.push(userDatabaseID);
    }






    if (command.match("rank")) {
        var rank = require("./commands/rank3.js");
        var response = rank.getRank(userDatabaseID, guildID, message.author.avatarURL);
        channel.send(response);
        
    }


    if (command.match("levels")) {
        var levels = require("./commands/levels3.js");
        var response = levels.run(guildID);
        channel.send(response);


    }









});





client.login(config.MudfrogNewToken);