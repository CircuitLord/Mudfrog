const randomResponse = require(".././functions/randomResponse.js");
const Discord = require("discord.js");



var exampleAdmin = randomResponse.run("exampleAdmin");
var tempbanExampleTime = randomResponse.run("tempbanExampleTime");
var tempbanExampleP1 = randomResponse.run("tempbanExampleP1");
var tempbanExampleP2 = randomResponse.run("tempbanExampleP2");
var tempbanExampleP3 = randomResponse.run("tempbanExampleP3");


module.exports.helpDesc = new Discord.RichEmbed()
  //The titles
  .setAuthor("Tempban:")
  .setTitle("-tempban <user> <time in mins> <reason>")
  .setColor(0xb5111c)
  .setDescription("Use this to tempban a user. They will be unable to rejoin the server for the amount of time you set.")
  .addField("Example:", "-tempban " + exampleAdmin + " " + tempbanExampleTime + " " + tempbanExampleP1 + " " + tempbanExampleP2 + " " + tempbanExampleP3)
  .setTimestamp()






exports.run = (client, message, args) => {

  var userToBan = message.mentions.users.first();

  if (args.length == 0) {
    message.channel.send("You need to specify who you want to tempban!");
    return;
  }

  if (args.length == 1) {
    message.channel.send("Please specify a time and reason why you are tempbanning them.");
    return;
  }

  if (args.length == 2) {
    message.channel.send("Please specify a reason why you are tempbanning them.");
    return;
  }


  var timeToBan = args[1];
  args.splice(0, 2);
  var banReason = args.join(" ")
  var serverBanFrom = message.guild.name;


  if (Number(timeToBan).isInteger == false) {
    message.channel.send("Please use a number when specifying minutes to ban.");
    return;
  }


  message.guild.member(userToBan).send("Sorry, you have been **temp banned** from **" + serverBanFrom + "** for **" + timeToBan + " minutes**, for reason: **" + banReason + "**\nOnce the time is up, please re-read the rules if you decide to rejoin.\nLink to rejoin after ban timer expires: https://discord.gg/ndDQbfk");

  function banUser() {
    //message.guild.member(userToBan).ban();
    message.guild.ban(userToBan)
    message.channel.send("User successfully banned for " + timeToBan + " minutes.");

  }


  setTimeout(banUser, 2000);

  setTimeout(unbanUser, Number(timeToBan * 60000))


  function unbanUser() {
    message.channel.send(userToBan.username + " has been unbanned from the server.")
    message.guild.unban(userToBan)

  }


//  var banTimeMins = Number(timeToBan);

  //var banTimer = minuteTimer.timer.create({
  //  minutes: Number(timeToBan)
//  });

  //minuteTimer.timer.start(banTimer);


  //banTimer.on("stop", {
    //userToBan.unban();
    //userToBan.send("You have been unbanned from **" + serverBanFrom + "**. Please re-read the rules, and enjoy your stay.")


  //});

















}
