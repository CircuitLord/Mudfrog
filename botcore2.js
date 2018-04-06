const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const Stopwatch = require("timer-stopwatch");
const prefix = config.prefix;
const json = require("json-file")
const levelConfig = json.read("./levelConfig.json");

const randomResponse = require("./functions/randomResponse.js");

var xpTimer = new Stopwatch(60000);
var usersGotXp = [];
var userXpMultiplier = 1;

var Ector = require('ector');
var ector = new Ector();





//Initialize Enamp for storing data persistantly.
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
client.points = new Enmap({ provider: new EnmapLevel({ name: 'XPDatabase' }) });
//client.xpScores.set("testkey", 324)

//database.set("thisiskey", "cool");



client.on("ready", function(message) {
  console.log("Let's do this!");
  xpTimer.start();
});



client.on("guildMemberAdd", (member) => {
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );

  var response = randomResponse.run("welcomeMsg");



  member.guild.channels.get("welcome").send(response);
});


xpTimer.onDone(function(){
  xpTimer.stop();
  xpTimer.reset(60000);
  console.log("resetting xp timer");
  usersGotXp = [];
  xpTimer.start();
});


client.on("messageReactionAdd", async function(messageReaction, user) {
   if (user.bot == true) return;
   var commandFile = require("./commands/vote.js");
   await commandFile.removeReaction(messageReaction, user);


});


client.on("messageReactionRemove", function(messageReaction, user) {
  if (user.bot == true) return;
  console.log(user.username)
  var commandFile = require("./commands/vote.js");
  commandFile.userUnVote(messageReaction, user);

});


client.on("message", function(message) {
  const username = message.author.username;
  const userID = message.author.id;
  const content = message.content;
  const channel = message.channel;
  var score = client.points.get(userID);

  if (message.author.bot == true) return;

  //Any user can run the following commands-------------------------------------------------------------------------------------------

//Test if user is talking in conversation mode with bot.
  if (content.startsWith("=")) {
    //console.log(channel)
    //ector.addEntry(content.substr(1));
    //var response = ector.generateResponse();
    //channel.send(response.sentence);
    //Don't run any other commands.
    //return;


  }

  //if (content.startsWith("-") == false) {
    //ector.addEntry(content);
  //}




  //This handles xp and stuff ==========================================================

  //Add new user to XP list
  if (score == null) {
    client.points.set(userID, { xp: 1, level: 0, name: username });
    score = client.points.get(userID)
  }

  //test
  if (content.startsWith(prefix) == false) {


  //Test if user already got XP for this minute. If not, give them XP.
    if (usersGotXp.includes(username) == false) {
      //channel.send("Giving " + username + " 1 xp")
      usersGotXp.push(username);
      score.xp = (score.xp + (1 * userXpMultiplier));



      console.log(levelConfig.get((score.level + 1).toString())  +  "  " + score.xp)
      if (levelConfig.get((score.level + 1).toString()) <= score.xp) {
        score.level++;

        var response = randomResponse.run("levelUpMsg");
        response = response.replace("{userMention}", "<@" + message.author.id + ">");
        response = response.replace("{level}", score.level);

        channel.send(response+ " (This just for testing, don't worry if the levels don't match)");
      }
      client.points.set(userID, score);
    }


    return;
  }



  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  //Rank command
  if (content.match(/-rank/i)) {

    var commandFile = require("./commands/rank.js");
    commandFile.run(client, message, score);
  }


  //set XP command.
  if (content.match(/-setxp(.*)/i)) {
    score.xp = Number(args[0]);
    score.level = Number(args[1])

    client.points.set(userID, score);
  }





  //Tempban command
  if (content.match(/-tempban/i)) {

    if (config.admins.includes(userID) == true) {
      var commandFile = require("./commands/tempban.js");
      commandFile.run(client, message, args);
    }
    else {
      console.log(username + " doesn't have permission to run this command.");
    }


  }


  //Warn user command
  if (content.match(/-warn/i)) {
    if ((config.admins.includes(userID) == true) || (username == "CircuitLord")) {
      var commandFile = require("./commands/warn.js");
      commandFile.run(client, message, args);
    }
    else {
      console.log(username + " doesn't have permission to run this command.");
    }
  }


  //Show top 3 users on server
  if (content.match(/-levels/i)) {
      var commandFile = require("./commands/levels.js");
      commandFile.run(client, message);
  }


  if (content.match(/-help/i)) {
      var commandFile = require("./commands/help.js");
      commandFile.run(client, message, args);
  }

///8ball question
  if (content.match(/-8 /i)) {
    
    var response = randomResponse.run("8ball");
    channel.send(response);

  }


  if (content.match(/-permban/i)) {
    if ((config.admins.includes(userID) == true) || (username == "CircuitLord")) {

      var oldMessage = message;

      channel.send("https://giphy.com/gifs/H99r2HtnYs492").then(function (message) {
        var gifMessage = message;
        //setTimeout(deleteGIF, 20000, gifMessage, oldMessage);

      });

    }

  }

  function deleteGIF(gifMessage, commandMessage) {
    gifMessage.delete()
    commandMessage.delete();
  }


  if (content.match(/-vote/i)) {
    if ((config.admins.includes(userID) == true) || (username == "CircuitLord")) {
      var commandFile = require("./commands/vote.js");

      commandFile.run(client, message);
      message.delete()

    }

  }



  if (content.match(/-reboot/i)) {
    if ((config.admins.includes(userID) == true) || (username == "CircuitLord")) {
      message.channel.send("Rebooting...");
      process.exit();

    }


  }








});




client.login(config.token);
