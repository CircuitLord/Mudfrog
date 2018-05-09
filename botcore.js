const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const utils = require("./utils/circuit-utils.js");

const jf = require("jsonfile");


var config = jf.readFileSync("./config.json")

var serverConfigs = {};
const usersExist = [];
const usersGotXp = [];



/*
    This code has gotten messy, will be re-written soon.
    
*/




client.on("ready", function (message) {
    console.log(`Mudfrog ${config.botVersion} is ready to go.`);
    xpTimer()
});

function xpTimer() {
    usersGotXP = [];
    setTimeout(xpTimer, 60000);
}


client.on("messageReactionAdd", function (messageReaction, user) {
    if (user.bot === true) return;

    var home = require("./home/home.js");

    const messageID = messageReaction.message.id;


    home.updateHome(messageReaction, user);


});


client.on("message", function (message) {

    if (message.author.bot == true) return;
    if (message.channel.type === "dm") return;


    //Load the server config into memory and make sure all users have a database entry.
    if (serverConfigs[message.guild.id] === undefined) {
        console.log("Loading config.");

        //Generate new config if needed.
        if (fs.existsSync("./serverConfigs/" + message.guild.id + ".json") == false) {
            console.log("Generating new config for " + message.guild.name + ".")
            jf.writeFileSync("./serverConfigs/" + message.guild.id + ".json", jf.readFileSync("./configTemplate.json"));
        }

        //Database entry stuff here.

        serverConfigs[message.guild.id] = jf.readFileSync(`./serverConfigs/${message.guild.id}.json`);
    }



    //Test if the message is a command.
    var command;
    if (message.content.startsWith(serverConfigs[message.guild.id].prefix)) {
        command = message.content.substr(1).split(" ")[0].toLowerCase();
    }


    message.username = message.author.username;
    message.userID = message.author.id;
    message.command = command;
    message.userDBID = message.author.id + "-" + message.guild.id;
    message.sConfig = serverConfigs[message.guild.id]

    var msg = {
        "content": message.content,
        "channel": message.channel,
        "username": message.author.username,
        "userID": message.author.id,
        "guild": message.guild,
        "command": command,
        "userDatabaseID": message.author.id + "-" + message.guild.id,
        process: function () {
            console.log("wow cool")
        }
    }



    //Test if user exists in database, if not, add them.
    if (usersExist.includes(msg.userDatabaseID) == false) {
        if (utils.fetchStats(msg.userDatabaseID) == null) {
            utils.addNewUser(msg);
            console.log("New user.");
            usersExist.push(msg.userDatabaseID);
        }
    }



    //Test if bot should give user EXP.
    if (command === undefined && serverConfigs[msg.guild.id].modules.xp == true && usersGotXp.includes(msg.userDatabaseID) == false) {
        usersGotXp.push(msg.userDatabaseID);
        console.log("giving xp")
        utils.updateXP(msg.userDatabaseID);
    }






    //Commands handler.
    if (msg.command !== undefined && fs.existsSync(`./commands/${msg.command}.js`) == true) {
        if (msg.command.startsWith("..")) return;

        try {
            require(`./commands/${msg.command}`).run(msg)
        } catch (e) {
            console.log(e)
            console.log(`${msg.command} can't be run.`)
        }


    }


    //Setup command only the owner can run.
    if (msg.command == "setup" && msg.guild.ownerID == msg.userID) {
        msg.process();


        message.guild.members.forEach(function (member) {
            console.log(member.user.username)
        });



        require("./botSetup.js").run(msg);
        message.delete();
    }


    if (msg.command == "home") {
        require("./home/home.js").init(message);
    }







});



client.on("guildCreate", function (guild) {
    //Triggers when bot joins guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    guild.defaultChannel.send(`Hey there, I'm Mudfrog! Let's get some inital stuff setup.\nRun \`-setup\` in whatever channel you'd like to do the setup in.`)
});







client.login(config.token);