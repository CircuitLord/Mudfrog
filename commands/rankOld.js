const Discord = require("discord.js");
const utils = require("../utils/circuit-utils.js");

const levelConfig = require("./levelConfig.json");



module.exports.helpDesc = new Discord.RichEmbed()
  .setAuthor("Rank:")
  .setTitle("-rank")
  .setColor(0xb5111c)
  .setDescription("Use this to get stats about your XP, Level, and ranking.")
  .addField("Example:", "`-rank`")


exports.run = (msg) => {
 
    var userDatabase = utils.eGet(msg.userDatabaseID);

    var userXP = userDatabase.xp;
    var userID = userDatabase.userID;
    var username = userDatabase.username;
    var userLevel = userDatabase.level;


    function compare(a, b) {
        if (a.xp < b.xp) return 1;
        if (a.xp > b.xp) return -1
        else return 0;
    }

    

    var users = utils.mapUsersServer(msg.guildID).sort(compare);

    var userRanking;

    var serverUserCount = 0;

    users.forEach((user, index) => {

        if (user === undefined) {
            console.log("User is undefined.");
            return;
        }

        serverUserCount++;

        if (user.userID == userID) {
            userRanking = (index + 1).toString(); 
        }

    });

    userRanking = (userRanking + "/" + serverUserCount);


    var xpForCurrentLevel = levelConfig.get(userDatabase.level.toString());

    var xpForNextLevel = levelConfig.get((userDatabase.level + 1).toString());

    var xpDifferenceBetweenLevels = (xpForNextLevel - xpForCurrentLevel);


    var percentageLevelUpDone = ((userDatabase.xp - xpForCurrentLevel) / xpDifferenceBetweenLevels)
    
    console.log(percentageLevelUpDone)

    var symbolsToAdd = (percentageLevelUpDone * 40);



    var progressBar = "[";
    for (i = 0; i < 40; i++) {
      if ((symbolsToAdd <= 0) == false) {
        progressBar = (progressBar + "|");
        symbolsToAdd = (symbolsToAdd - 1);
      }
      else {
        progressBar = (progressBar + " ");
      }
    }
  
    progressBar = (progressBar + "]");








    const xpRichEmbed = new Discord.RichEmbed()
        .setAuthor(username)
        .setThumbnail(userAvatar)
        .addField("Total XP:", userXP, true)
        .addField("Ranking:", userRanking, true)
        .addField("Level Progess:", "**Lvl. " + userDatabase.level + "** " + progressBar + " **Lvl. " + (userDatabase.level + 1) + "**", true)
        .setColor(0x428ef4);


    msg.channel.send(xpRichEmbed)





}