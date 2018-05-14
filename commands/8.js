const Discord = require("discord.js");


exports.run = (MUDFROG, msg) => {
    msg.channel.send(MUDFROG.utils.gra(["It is likely.", "It is not likely.", "Of course.", "Of course not.", "What do you think?", "Yeah, definitely.", "Definitely not.", "Yep!", "Nope.", "For sure!", "Not a chance.", "Wait, what? Sorry, I was busy.", "Uhh.... Yes.", "Erm... No."]))

}