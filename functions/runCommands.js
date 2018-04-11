//Input a command with optional args, and it runs it.




exports.runCommand = (message, command, args) => {

    const username = message.author.username;
    const guildID = message.guild.id.toString();
    const userID = message.author.id.toString();
    const content = message.content;
    const channel = message.channel;
    

    if (command.match("rank")) {
        var commandFile = require("./commands/rank.js");
        var response = commandFile.getRank(userDatabaseID, guildID, message.author.avatarURL);
        channel.send(response);
        return;
    }






}