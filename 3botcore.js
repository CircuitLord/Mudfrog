const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

const utils = require("./functions/circuit-utils.js");

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

    if (usersGotXP.includes(userDatabaseID) == false && utils.fetchStats(userDatabaseID) == null) {
        utils.addNewUser(userID, username, guildID, userDatabaseID);
        console.log("New user.")
    }

    if (usersGotXP.includes(userDatabaseID) == false && isCommand == false) {
        console.log("Giving xp")
    //Update user XP, and test if they leveled up.
        var leveledUp = utils.updateXP(userDatabaseID);

        if (leveledUp[0] == true) {

            var response = randomResponse.run("levelUpMsg");
            response = response.replace("{userMention}", "<@" + userID + ">");
            response = response.replace("{level}", leveledUp[1]);
    
            channel.send(response);
        }
        //usersGotXP.push(userDatabaseID);


    }






    if (command.match("rank")) {
        var rank = require("./commands/rank3.js");
        var response = rank.getRank(userDatabaseID, guildID, message.author.avatarURL);
        channel.send(response);
        
    }


    if (command.match("levels")) {
       // channel.startTyping();
        var levels = require("./commands/levels3.js");
        var response = levels.run(guildID);
       // ai.typingTime(response);
       // channel.stopTyping();
        channel.send(response);



    }




    if (command.match("8")) {
       // channel.startTyping();
       // var response = randomResponse.run("8ball");


        //setTimeout(() => {
        //    channel.send(response);
       //     channel.stopTyping();
        //}, response.length * 40);



    }









});





client.login(config.MudfrogNewToken);