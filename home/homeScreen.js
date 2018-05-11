const Discord = require("discord.js");


function grab(opt1, opt2, opt3, opt4, opt5, opt6) {
    var array = [];
    if (opt1 !== undefined) array.push(opt1);
    if (opt2 !== undefined) array.push(opt2);
    if (opt3 !== undefined) array.push(opt3);
    if (opt4 !== undefined) array.push(opt4);
    if (opt5 !== undefined) array.push(opt5);
    if (opt6 !== undefined) array.push(opt6);
    return array[Math.floor(Math.random() * array.length)];

}




exports.run = (msg, input) => {

    var opt1, opt2, opt3, opt4, opt5, opt6 = {};

    opt1.desc = grab(
        "Use fancy words to make me do cool things!",
        "This is where the magic happens.",
        "The best part.",
        "`-permban {user} 200d this is not an example`",
        "Go here, it's cool.",
        "Lots of complex commands for you to enjoy."
    );

    opt2.desc = grab(
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
        .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion + " - developed by CircuitLord_")



    msg.edit(screen)








}