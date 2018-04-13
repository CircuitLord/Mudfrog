const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

const utils = require("./functions/circuit-utils.js");
const ai = require("./functions/ai.js")
const fs = require('fs');
const json = require("json-file");

var usersGotXP = [];
var usersExist = [];
var serverConfig;
var serverConfigs = [];









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





    //Test if message is a command, if so, set isCommand to true.
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
            var resonse = "Someone leveled up."

            //var response = randomResponse.run("levelUpMsg");
            //response = response.replace("{userMention}", "<@" + userID + ">");
            //response = response.replace("{level}", leveledUp[1]);
    
            channel.send(response);
        }
        //usersGotXP.push(userDatabaseID);

        return;


    }



    //Load server config.


    //If server config doesn't exist, make it.
    if (fs.existsSync("./serverConfigs/" + guildID + ".json") == false) {
        const defaultConfig = require("./serverConfigTemplate.json")
        //fs.writeFile("./serverConfigs/" + guildID + ".json", defaultConfig);

        fs.writeFileSync("./serverConfigs/" + guildID + ".json", JSON.stringify(require("./serverConfigTemplate.json")), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        });

        serverConfig = json.read("./serverConfigs/" + guildID + ".json");
        serverConfig.set("guildID", guildID);
        serverConfig.writeSync()



    }


    serverConfig = json.read("./serverConfigs/" + guildID + ".json");


    if (command.match("home")) {
        var commandFile = require("./commands/home.js");
        
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
        //console.log(utils.getRandomUser(message))
        ai.sendAI(client, message, args, command, response);
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