

const Discord = require("discord.js");

const fs = require("fs");


const MUDFROG = new Discord.Client();

MUDFROG.utils = require("./utils/circuit-utils.js");
MUDFROG.config = require("./config.json")
MUDFROG.db = require("./utils/database.js")



client.on("ready", function (message) {
    console.log(`Mudfrog ${MUDFROG.config.botVersion} is ready to go.`);
});