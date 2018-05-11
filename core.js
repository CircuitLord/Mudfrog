

const Discord = require("discord.js");

const fs = require("fs");


const MUDFROG = new Discord.Client();


//Initialize all the sub parts of the MUDFROG core object.
MUDFROG.utils = require("./utils/circuit-utils.js");
MUDFROG.config = require("./config.json");
MUDFROG.configTemp = require("./configTemplate.json")
MUDFROG.db = require("./utils/database.js");
MUDFROG.activeConfigs = {};


MUDFROG.on("ready", function (message) {





    //Load server configs.
    function testGuildConfig(guild, index, arr) {
        if (MUDFROG.db.configGet(guild.id) === null) {
            MUDFROG.db.configSet(guild.id, MUDFROG.configTemp);  
        }
        return true;
    }

    MUDFROG.guilds.every(testGuildConfig);

    MUDFROG.activeConfigs = MUDFROG.db.loadConfigs();





    console.log(`Mudfrog ${MUDFROG.config.botVersion} is ready to go.`);
});






MUDFROG.login(MUDFROG.config.token);