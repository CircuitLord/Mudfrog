const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

const utils = require("./functions/circuit-utils.js");
const randomResponse = require("./functions/randomResponse.js");
const ai = require("./functions/ai.js")

var usersGotXP = [];
var usersExist = [];









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
    if (message.channel.type === "dm") return;
    

    const username = message.author.username;
    const guildID = message.guild.id.toString();
    const userID = message.author.id.toString();
    const content = message.content;
    const channel = message.channel;

    const userDatabaseID = (guildID + "-" + userID);

    var command = "";
    var isCommand = false;
    var args = "";

    if (content.startsWith("-")) {
        args = message.content.slice(1).trim().split(/ +/g);
        command = args.shift().toLowerCase();
        
        isCommand = true;
    }

    //Test if user exists in loaded memory, then test if they exist in database. If none, create a new one with the template.
    if (usersExist.includes(userDatabaseID) == false) {
        if (utils.fetchStats(userDatabaseID) == null) {
        utils.addNewUser(userID, username, guildID, userDatabaseID);
        console.log("New user.");
        usersExist.push(userDatabaseID);
        }
    }

    //Give a user XP if they haven't got any that minute and they aren't using a command.
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
        var rank = require("./commands/rank.js");
        var response = rank.getRank(userDatabaseID, guildID, message.author.avatarURL);
        channel.send(response);
        
    }


    if (command.match("vote")) {
        var commandFile = require("./commands/vote.js");
        commandFile.run(client, message);
    }

    if (command.match("ai")) {
        var response = "This is a test message."
        console.log(utils.getRandomUser(message))
        //ai.sendAI(channel, args, command, response);
    }

    if (command.match("help")) {
        var commandFile = require("./commands/help.js");
        commandFile.run(client, message, args);
    }


    if (command.match("levels")) {
       // channel.startTyping();
        var levels = require("./commands/levels.js");
        var response = levels.run(guildID);
       // ai.typingTime(response);
       // channel.stopTyping();
        channel.send(response);



    }





    if (command.match("8")) {
        channel.startTyping();
        var response = randomResponse.run("8ball");


        setTimeout(() => {
            channel.send(response);
            channel.stopTyping();
        }, response.length * 40);



    }









});





client.login(config.MudfrogNewToken);