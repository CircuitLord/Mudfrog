const Discord = require("discord.js");
const randomResponse = require(".././functions/randomResponse.js");

module.exports.helpDesc = new Discord.RichEmbed()
  //The titles
  .setAuthor("Help:")
  .setTitle("-help <command-name>")
  .setColor(0xb5111c)
  .setDescription("Use this command to get info on a specific command.")
  .addField("Example:", "`-help vote`")
  .setTimestamp()



exports.run = (client, message, args) => {

  console.log(args)

  if (args.length < 1) {
    console.log("it works")
    message.channel.send("You need to specify a command you need help with! `-help <command-name>`");
    return;
  }


  try {
    var commandSourceFile = require(`./${args[0]}.js`);
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    console.log(commandSourceFile.helpDesc)
    message.channel.send(commandSourceFile.helpDesc);

  } catch(err) {


    var response = randomResponse.run("helpConfused");
    response = response.replace("{command}", args[0])
    message.channel.send(response)
    console.log(err)

  }


}
