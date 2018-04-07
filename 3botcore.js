

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
    console.log("xpTimer resetting")
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

    var isCommand = false;
    if (content.startsWith("-")) isCommand = true;


    if (usersGotXP.includes(userDatabaseID == false) && xp.fetchStats == null) {
        xp.addNewUser(userID, username, guildID, userDatabaseID);
    }

    if (usersGotXP.includes(userDatabaseID) == false && isCommand == false) {
        console.log("Giving xp")
        xp.update(userDatabaseID);
        usersGotXP.push(userDatabaseID);
    }


    if (content.match(/-rank/i)) {
        console.log(xp.fetchStats(userDatabaseID));
        
    }












});





client.login(config.MudfrogNewToken);