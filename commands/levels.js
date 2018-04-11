const Discord = require("discord.js");
const utils = require("../functions/circuit-utils.js");


module.exports.helpDesc = new Discord.RichEmbed()
  .setAuthor("Levels:")
  .setTitle("-levels")
  .setColor(0xb5111c)
  .setDescription("This command lists the top 3 users on the server, and their stats.")
  .addField("Example:", "`-levels`")
  .setTimestamp()



exports.run = (guildID) => {

    function compare(a, b) {
        if (a.xp < b.xp) return 1;
        if (a.xp > b.xp) return -1
        else return 0;
    }

    var users = utils.mapUsersServer(guildID).sort(compare);

    var firstPlace = (users[0].username + ": Lvl: " + users[0].level + " XP: " + users[0].xp);

    var secondPlace = "_none_";
    if (users[1] != null) secondPlace = (users[1].username + ": Lvl: " + users[1].level + " XP: " + users[1].xp);

    var thirdPlace = "_none_";
    if (users[2] != null) thirdPlace = (users[2].username + ": Lvl: " + users[2].level + " XP: " + users[2].xp);

    



    const levelsRE = new Discord.RichEmbed()
    .setAuthor("User Rankings:")
    //.setThumbnail(message.author.avatarURL)
    .addField("First Place:", firstPlace, false)
    .addField("Second Place:", secondPlace, false)
    .addField("Third Place:", thirdPlace, false)
    .setColor(0x428ef4);


    return levelsRE;





}