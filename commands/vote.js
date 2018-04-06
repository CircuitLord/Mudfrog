const randomResponse = require(".././functions/randomResponse.js");
const Discord = require("discord.js");
const Stopwatch = require("timer-stopwatch");


module.exports.helpDesc = new Discord.RichEmbed()
  //The titles
  .setAuthor("Vote:")
  .setColor(0xb5111c)
  .setDescription("This command is used for voting (surprise!). You can start or stop a vote in any channel you want.")
  .addField("Start a vote:", "`-vote start, <time in mins>, <question>, <answer1>, <answer2> etc.`\n`-vote start, 10, Where are my smoothies?, In the fridge, In the attic, In the trashcan`")
  .addField("End a vote:", "`-vote end`")
  .addField("Cancel a vote (without counting results):", "`-vote cancel`")
  .setTimestamp()


module.exports.voteMessageIDs = [];
var usersVoted = {};




exports.run = (client, message) => {
  const username = message.author.username;
  const userID = message.author.id;
  const content = message.content;
  const channel = message.channel;

  const argsArray = content.split(", ");

  //Vote options
  var voteCmd = argsArray[0].substr(6)
  var voteTimeMins = argsArray[1];
  var voteQuestion = argsArray[2];
  var voteAnswers = [];
  var voteMessageID;

  for (i = 3; i < argsArray.length; i++) {
    voteAnswers.push(argsArray[i]);
  }

  console.log(voteAnswers)

  if (voteCmd == "start") {
    /*
    console.log(voteTimeMins)
    console.log(typeof voteTimeMins)
    if (typeof voteTimeMins !== "number") {
      channel.send("That is not a valid time for voting.");
      return;
    }
    */

    if (voteQuestion == null) {
      channel.send("Please specify a question for the vote.");
      return;
    }

    if (voteAnswers.length < 1) {
      channel.send("Please specify at least 2 voting options.");
      return;
    }

    if (voteAnswers.length > 9) {
      channel.send("That's too many options.");
      return;
    }

    var finalOptionsField = "";

    for (i = 0; i < voteAnswers.length; i++) {
      finalOptionsField = (finalOptionsField + "**" + (i + 1) + ":** " + voteAnswers[i] + "\n");

    }


    var questionEmbed = new Discord.RichEmbed()
      .setAuthor(username + " wants to know:")
      .setTitle(voteQuestion)
      .setColor(0xa0bddf)
      .addField("Options:", finalOptionsField + "Vote for one by reacting to the corresponding emoji below.\nThe vote will last " + voteTimeMins + " minutes.")
      .setTimestamp();


    channel.send(questionEmbed).then(async function (message) {

      const filter = (reaction, user) => 1 == 1
      message.awaitReactions(filter, { time: Number(voteTimeMins) * 60000 }).then(function(collected) {
        var voteCountArray = collected.map(g => g.count);
        console.log(collected)
        console.log(voteCountArray)

        var finalCountMessage = "**" + voteQuestion + "**\n";
        for (i = 0; i < voteAnswers.length; i++) {
          finalCountMessage = (finalCountMessage + voteAnswers[i] + " got **" + (Number(voteCountArray[i]) - 1) + " votes!**\n");
        }
        message.channel.send(finalCountMessage)

      });
      usersVoted[message.id] = [];

      module.exports.voteMessageIDs.push(message.id)


      const emojiIDArray = [`\u0031\u20e3`, `\u0032\u20e3`, `\u0033\u20e3`, `\u0034\u20e3`, `\u0035\u20e3`, `\u0036\u20e3`, `\u0037\u20e3`, `\u0038\u20e3`, `\u0039\u20e3`];

      addReactions(message, voteAnswers)

      async function addReactions(message, voteAnswers) {
        for (i = 0; i < (voteAnswers.length); i++) {
          await message.react(emojiIDArray[i])
          console.log("ping");


        }
      }



      function countVotes() {
        var voteCountArray = message.reaction.map(g => g.count);
        var finalCountMessage = "";
        console.log(voteCountArray)


        for (i = 0; i < voteAnswers.length; i++) {
          finalCountMessage = (finalCountMessage + voteAnswers[i] + " got **" + voteCountArray[i] + " votes!**\n");
        }

        channel.send(finalCountMessage)
      }


    });








  }


}


exports.removeReaction = (messageReaction, user) => {
  //Test if message is a voting message.
  if (module.exports.voteMessageIDs.includes(messageReaction.message.id) == false) return;

  var temp = messageReaction.users.map(g => g.username);
  var voteCountArray = messageReaction.message.reactions.map(g => g.count);

//Check to see if user has voted.
  if (usersVoted[messageReaction.message.id].includes(user.username)) {
    messageReaction.remove(user);
    usersVoted[messageReaction.message.id].push(user.username);
    console.log(user.username + " already voted!");
    console.log(usersVoted)
    return;
  }

  //Adds user to voted list for that message only.
  usersVoted[messageReaction.message.id].push(user.username);





}




exports.userUnVote = (messageReaction, user) => {
  //Test if message is a voting message.
  if (module.exports.voteMessageIDs.includes(messageReaction.message.id) == false) return;

//Removes user from the list of voters.
  var index = usersVoted[messageReaction.message.id].indexOf(user.username);
  if (index >= 0) {
    usersVoted[messageReaction.message.id].splice(index, 1);
  }

}
