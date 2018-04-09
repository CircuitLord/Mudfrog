const enmap = require("../enmap/enmap.js");
const Discord = require("discord.js");
const json = require("json-file");

const levelConfig = json.read("./levelConfig.json");



module.exports.helpDesc = new Discord.RichEmbed()
  .setAuthor("Rank:")
  .setTitle("-rank")
  .setColor(0xb5111c)
  .setDescription("Use this to get stats about your XP, Level, and ranking.")
  .addField("Example:", "`-rank`")


exports.getRank = (userDatabaseID, guildID, userAvatar) => {
 
    var userDatabase = enmap.get(userDatabaseID);

    var userXP = userDatabase.xp;
    var userID = userDatabase.userID;
    var username = userDatabase.username;
    var userLevel = userDatabase.level;


    function compare(a, b) {
        if (a.xp < b.xp) return 1;
        if (a.xp > b.xp) return -1
        else return 0;
    }

    

    var users = enmap.mapUsersServer(guildID).sort(compare);

    var userRanking;

    users.forEach((user, index) => {

        if (user.userID == undefined) {
            console.log("User is undefined.")
        }

        if (user.userID == userID) {
            userRanking = (index + 1).toString(); 
        }

    });

    userRanking = (userRanking + "/" + users.length);


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

    return xpRichEmbed;





}