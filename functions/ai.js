//Handles all AI parts of Mudfrog

const Discord = require("discord.js");

const utils = require("./circuit-utils.js");



exports.sendAI = (message, args, command, response) => {

    var num = utils.genRandomTest(3);

    console.log(num)
 




}







exports.typingTime = (response) => {
    var timeWait = (response.length * genRandomWhole(30, 50));
    setTimeout(() => {
        return;
      }, timeWait);
}


