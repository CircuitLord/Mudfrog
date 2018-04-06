const randomResponse = require(".././functions/randomResponse.js");
const Discord = require("discord.js");


module.exports.helpDesc = new Discord.RichEmbed()
  .setAuthor("Warn:")
  .setTitle("-warn <user> <reason>")
  .setColor(0xb5111c)
  .setDescription("This command will DM a user, and tell them to do what you said.")
  .addField("Example:", "`-warn @Person Please stop making so many smoothies`")
  .setTimestamp()






exports.run = (client, message, args) => {

  var userToWarn = message.mentions.users.first();

  if (args.length == 0) {
    message.channel.send("You need to specify who you want to warn!");
    return;
  }

  if (args.length == 1) {
    message.channel.send("Please specify a reason why you are warning them.");
    return;
  }





  args.splice(0, 1);
  var warnReason = args.join(" ")
  var serverWarnFrom = message.guild.name;



  message.guild.member(userToWarn).send("You have been warned on **" + serverWarnFrom + ":** " + warnReason);
  message.channel.send("Successfully warned " + userToWarn.username + ".")






}
