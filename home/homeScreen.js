const Discord = require("discord.js");


exports.initHome = (MUDFROG, msg) => {
    opt1.desc = MUDFROG.utils.grab(
        "Use fancy words to make me do cool things!",
        "This is where the magic happens.",
        "The best part.",
        "`-permban {user} 200d this is not an example`",
        "Go here, it's cool.",
        "Lots of complex commands for you to enjoy."
    );


    opt2.desc = MUDFROG.utils.grab(
        "Break all my settings here.",
        "Tweak everything to your desire.",
        "Opening this voids your warrenty.",
        "ERR `opt2.desc` not found",
        "Wait, they can change my settings?"
    );


    var screen = new Discord.RichEmbed()
        .setAuthor(grab(`Hey there, ${msg.author.username}!`, `How's it going, ${msg.author.username}?`))
        .addField("1: Commands", opt1.desc)
        .addField("2: Options", opt2.desc)
        .addBlankField()
        .addBlankField()
        .addBlankField()
        .addBlankField()
        .setColor(0xb5111c)
        .addField("----------------------------------------------------------------------", "_Mudfrog " + MUDFROG.config.botVersion + " - developed by CircuitLord_")

    msg.channel.send(screen).then(function(msg) {
        return msg;
    });



}


exports.run = (MUDFROG, msg) => {



    opt1.desc = MUDFROG.utils.grab(
        "Use fancy words to make me do cool things!",
        "This is where the magic happens.",
        "The best part.",
        "`-permban {user} 200d this is not an example`",
        "Go here, it's cool.",
        "Lots of complex commands for you to enjoy."
    );


    opt2.desc = MUDFROG.utils.grab(
        "Break all my settings here.",
        "Tweak everything to your desire.",
        "Opening this voids your warrenty.",
        "ERR `opt2.desc` not found",
        "Wait, they can change my settings?"
    );


    var screen = new Discord.RichEmbed()
        .setAuthor(grab(`Hey there, ${msg.author.username}!`, `How's it going, ${msg.author.username}?`))
        .addField("1: Commands", opt1.desc)
        .addField("2: Options", opt2.desc)
        .addBlankField()
        .addBlankField()
        .addBlankField()
        .addBlankField()
        .setColor(0xb5111c)
        .addField("----------------------------------------------------------------------", "_Mudfrog " + MUDFROG.config.botVersion + " - developed by CircuitLord_")



    msg.edit(screen);



}



exports.input = (MUDFROG, msg, input) => {




}