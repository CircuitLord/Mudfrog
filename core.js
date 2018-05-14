

const Discord = require("discord.js");

const fs = require("fs");


const MUDFROG = new Discord.Client();


//Initialize all the sub parts of the MUDFROG core object.
MUDFROG.utils = require("./utils/circuit-utils.js");
MUDFROG.config = require("./config.json");
MUDFROG.configTemp = require("./configTemplate.json")
MUDFROG.db = require("./utils/database.js");
MUDFROG.activeConfigs = {};

MUDFROG.runCommand = function(MUDFROG, msg, command) {
    require(`./commands/${command}.js`).run(MUDFROG, msg);
}

MUDFROG.loadConfigs = function() {
    function testGuildConfig(guild, index, arr) {
        if (MUDFROG.db.configGet(guild.id) === null) {
            MUDFROG.db.configSet(guild.id, MUDFROG.configTemp);
        }
        return true;
    }

    MUDFROG.guilds.every(testGuildConfig);

    MUDFROG.activeConfigs = MUDFROG.db.loadConfigs();

}

MUDFROG.reloadConfig = function(key) {
    MUDFROG.activeConfigs[key] = MUDFROG.db.configGet(key);
}




MUDFROG.on("ready", function (msg) {

    //Load server configs.
    MUDFROG.loadConfigs();


    console.log(`Mudfrog ${MUDFROG.config.botVersion} is ready to go.`);
});



MUDFROG.on("message", function (msg) {

    //Ignore DMs and Bots.
    if (msg.author.bot == true) return;
    if (msg.channel.type === "dm") return;

    //Test if message is a command.
    msg.isCommand = false;
    if (msg.content.startsWith(MUDFROG.activeConfigs[msg.guild.id].prefix)) msg.isCommand = true;

    //If msg is a command, return.
    if (msg.isCommand == false) return;



    //Useful addons to MSG object.
    msg.serverConfig = MUDFROG.activeConfigs[msg.guild.id];
    msg.username = msg.author.username;
    msg.author.roles = MUDFROG.utils.getRoles(msg);
    msg.command = msg.content.substr(1).split(" ")[0].toLowerCase();
    msg.args = msg.content.substr(1).split(" ").slice(1);



    //Command Handler.
    const commandList = [];
    fs.readdirSync("./commands/").forEach(file => {
        commandList.push(file);
    });



    if (msg.command == "home") {
        require("./home/homeCore.js").newHome(MUDFROG, msg);
        return;
    }

    if (msg.command == "8" || msg.command == "8ball") {
        MUDFROG.runCommand(MUDFROG, msg, "8");
        return;
    }


    //If custom command is not detected, fallback to automatic detection.
    if (commandList.includes(`${msg.command}.js`)) {
        MUDFROG.runCommand(MUDFROG, msg, msg.command)
        return;
    }

});








MUDFROG.login(MUDFROG.config.token);