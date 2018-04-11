const randomResponse = require(".././functions/randomResponse.js");
const Discord = require("discord.js");

module.exports.helpDesc = new Discord.RichEmbed()
  .setAuthor("Levels:")
  .setTitle("-levels")
  .setColor(0xb5111c)
  .setDescription("This command lists the top 3 users on the server, and their stats.")
  .addField("Example:", "`-levels`")
  .setTimestamp()


exports.run = (client, message) => {

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

  xpScores = xpScores.sort(compare)


  console.log(xpScores);

  const xpRichEmbed = new Discord.RichEmbed()
    .setAuthor("User Rankings:")
    //.setThumbnail(message.author.avatarURL)
    .addField("First Place:", xpScores[0].name + ": Lvl: " + xpScores[0].level + " XP: " + xpScores[0].xp, false)
    .addField("Second Place:", xpScores[1].name + ": Lvl: " + xpScores[1].level + " XP: " + xpScores[1].xp, false)
    .addField("Third Place:", xpScores[2].name + ": Lvl: " + xpScores[2].level + " XP: " + xpScores[2].xp, false)
    //.addField("Ranking:", userRanking, true)
    //.addField("Level Progess:", "**Lvl. " + xpScores[userSpot].level + "** " + progressBar + " **Lvl. " + (xpScores[userSpot].level + 1) + "**", true)
    .setColor(0x428ef4);

    message.channel.send(xpRichEmbed)

}
