const Discord = require("discord.js");
const json = require("json-file");
const levelConfig = json.read("./levelConfig.json");

module.exports.helpDesc = new Discord.RichEmbed()
  //The titles
  .setAuthor("Rank:")
  .setTitle("-rank")
  .setColor(0xb5111c)
  .setDescription("Use this to get stats about your XP, Level, and ranking.")
  .addField("Example:", "`-rank`")
  .setTimestamp()



exports.run = (client, message, score) => {
  var userRanking = "";
  var userSpot;


  var xpScores = client.points.map(function(xpValue) {
    return xpValue;

  });

  function compare(a, b) {
  if (a.xp < b.xp) {
    return 1;
  }
  if (a.xp > b.xp) {
    return -1;
  }
  // a must be equal to b
  return 0;
  }

  xpScores.sort(compare);
  console.log(xpScores)

  for (var i = 0; i < xpScores.length; i++) {
    if (xpScores[i].name == message.author.username) {
      userRanking = ((i + 1) + "/" + xpScores.length);
      userSpot = i;

      break;

    }

  }


  var levelXpDifference = (levelConfig.get(((xpScores[userSpot].level) + 1).toString()) - levelConfig.get(xpScores[userSpot].level.toString()));
  var userLevelXpProgress = (xpScores[userSpot].xp - levelConfig.get(xpScores[userSpot].level.toString()));
  var percentOfLevelDone = (userLevelXpProgress / levelXpDifference);
  var symbolsToAdd = (percentOfLevelDone * 40);


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
    .setAuthor(message.author.username)
    .setThumbnail(message.author.avatarURL)
    .addField("Total XP:", xpScores[userSpot].xp, true)
    .addField("Ranking:", userRanking, true)
    .addField("Level Progess:", "**Lvl. " + xpScores[userSpot].level + "** " + progressBar + " **Lvl. " + (xpScores[userSpot].level + 1) + "**", true)
    .setColor(0x428ef4);

  message.channel.send(xpRichEmbed);


}
