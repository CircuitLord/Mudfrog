const Discord = require("discord.js");


exports.run = (MUDFROG, msg) => {

    var userToWarn = msg.mentions.users.first();

    if (msg.args.length == 0) {
        msg.channel.send(MUDFROG.utils.gra(["Um, who am I supposed to warn?", "Please say who you want to warn.", "Um, warn who?", "Am I supposed to warn you?"])).then(function(botMsg) {
            MUDFROG.utils.deleteDelayed(msg, 4000);
            MUDFROG.utils.deleteDelayed(botMsg, 4000);
        });

        return;
      }
    
    if (msg.args.length == 1) {
        msg.channel.send(MUDFROG.utils.gra([`Okay... But, why are you warning ${userToWarn.username}?`, `I need a reason before I can warn ${userToWarn.username}.`, `Please provide why you are warning ${userToWarn.username}.`])).then(function(botMsg) {
            MUDFROG.utils.deleteDelayed(msg, 4000);
            MUDFROG.utils.deleteDelayed(botMsg, 4000);
        });
        return;
    }



    var warnReason = msg.args.slice(1).join(" ");
    msg.channel.send(MUDFROG.utils.gra([`I warned ${userToWarn.username} for you.`, `${userToWarn.username} has been warned.`, `I warned ${userToWarn.username}.`]));
    msg.guild.member(userToWarn).send("You have been warned on **" + msg.guild.name + ":** " + warnReason);
    
    

}