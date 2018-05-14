const Discord = require("discord.js");


var activeVotes = {};







exports.run = (MUDFROG, msg) => {

    const filter = m => m.content.startsWith(MUDFROG.activeConfigs[msg.guild.id].prefix);

    msg.args = msg.content.split(`, `).slice(1);

    var voteTime;
    var screen = new Discord.RichEmbed()
        .setAuthor(MUDFROG.utils.grab(`${msg.author.username} wants to know:`, `${msg.author.username} asks:`))


    if (msg.args[0] !== undefined) {
        //msg.args[0] = Number(msg.args[0])


        if (isNaN(msg.args[0]) == false) {
           voteTime = msg.args[0];
        } else {
            MUDFROG.utils.deleteDelayed(msg, 4000);
            msg.channel.send(MUDFROG.utils.grab(`Please give a valid number for the vote time.`, `I've never heard of the number ${msg.args[0]}.`, `Um. ${msg.args[0]} isn't a number.`)).then(function(msg) {
            MUDFROG.utils.deleteDelayed(msg, 4000);
           });
           return;
        }
    } else {
        MUDFROG.utils.deleteDelayed(msg, 4000);
        msg.channel.send(MUDFROG.utils.grab(`You need to say how long the vote is.`, `Please put a valid number for the vote length.`)).then(function(msg) {
            MUDFROG.utils.deleteDelayed(msg, 4000);
        });
        return;
    }



    if (msg.args[1] !== undefined) {
        screen.setTitle(`${msg.args[1]}`);
    } else {
        MUDFROG.utils.deleteDelayed(msg, 4000);
        msg.channel.send(MUDFROG.utils.grab(`You need to supply a question.`, `Um, what did you want to ask?`, `Am I supposed to make up a question?`)).then(function(msg) {
            MUDFROG.utils.deleteDelayed(msg, 4000);
        });
        return;
    }

    var i = 0;

    if (msg.args[2] !== undefined) {
        i++;
        screen.setDescription(`**Options:**\n**1:** ${msg.args[2]}\n`);
    } else {
        MUDFROG.utils.deleteDelayed(msg, 4000);
        msg.channel.send(MUDFROG.utils.grab(`Please add at least two options.`, `How is this a vote if there's no options?`)).then(function(msg) {
            MUDFROG.utils.deleteDelayed(msg, 4000);
        });
        return;
    }

    if (msg.args[3] !== undefined) {
        i++;
        screen.setDescription(`${screen.description}**2:** ${msg.args[3]}\n`);
    }

    if (msg.args[4] !== undefined) {
        i++;
        screen.setDescription(`${screen.description}**3:** ${msg.args[4]}\n`);
    }

    if (msg.args[5] !== undefined) {
        i++;
        screen.setDescription(`${screen.description}**4:** ${msg.args[5]}\n`);
    }

    if (msg.args[6] !== undefined) {
        i++;
        screen.setDescription(`${screen.description}**5:** ${msg.args[6]}\n`);
    }


    screen.setDescription(`${screen.description}React to the corrosponding emoji of whichever option you want to vote for.`)
    .addField("----------------------------------------------------------------------", "_Mudfrog " + MUDFROG.config.botVersion + " - developed by CircuitLord_")
    msg.delete();
    const emojiIDArray = [`\u0031\u20e3`, `\u0032\u20e3`, `\u0033\u20e3`, `\u0034\u20e3`, `\u0035\u20e3`, `\u0036\u20e3`, `\u0037\u20e3`, `\u0038\u20e3`, `\u0039\u20e3`];
    msg.channel.send(screen).then(async function(msg) {
        await msg.react(`\u0031\u20e3`);
        await msg.react(`\u0032\u20e3`);

        if (i >= 3) await msg.react(`\u0033\u20e3`);
        if (i >= 4) await msg.react(`\u0034\u20e3`);
        if (i >= 5) await msg.react(`\u0035\u20e3`);

        activeVotes[msg.id] = {active: true, owner: msg.author.id}
        


    });
    
    
    


}







exports.newReact = (messageReaction, user) => {

    const msg = messageReaction.message;
    const reaction = messageReaction.emoji.name;



    if (activeVotes[msg.id] === undefined) return;

    messageReaction.remove(user);








}