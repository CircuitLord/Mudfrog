//Handles all AI parts of Mudfrog

const Discord = require("discord.js");

const utils = require("./circuit-utils.js");


//Import commands:
const rank = require("../commands/rank.js");



exports.sendAI = async (client, message, args, command, response) => {
    const username = message.author.username;
    const guildID = message.guild.id.toString();
    const userID = message.author.id.toString();
    const content = message.content;
    const channel = message.channel;

    const userDatabaseID = (guildID + "-" + userID);
    console.log(userDatabaseID)

    var num = utils.genRandomTest(3);
    


    if (utils.genRandomTest(0) == true) {
        var randomUserID = utils.getRandomUserID(message);


        var user = await client.fetchUser(randomUserID);




        var fakeResponse = rank.getRank(guildID + "-" + user.id, guildID, user.avatarURL);
        console.log(fakeResponse)

        channel.send(fakeResponse).then(function(message) {
            setTimeout(() => {
                channel.send("Oh, my bad, wrong person.");
                //message.delete()
                setTimeout(() => {

                    //message.delete();
                    message.edit(response)
                }, 2000);
                //message.channel.send(response)
            }, 3000);
        })




        

        



    }

    
 




}







exports.typingTime = (response) => {
    var timeWait = (response.length * genRandomWhole(30, 50));
    setTimeout(() => {
        return;
      }, timeWait);
}


