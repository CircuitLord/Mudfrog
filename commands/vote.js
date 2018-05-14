const Discord = require("discord.js");







exports.run = (MUDFROG, msg) => {

    const filter = m => m.content.startsWith(MUDFROG.activeConfigs[msg.guild.id].prefix);

    msg.args = msg.content.split(`, `).slice(1);

    var screen = new Discord.RichEmbed()
        .setAuthor(MUDFROG.utils.grab(`${msg.author.username} wants to know:`, `${msg.author.username} asks:`))



    if (msg.args[0] !== undefined) {
        screen.setTitle(`${msg.args[0]}`);
    } else {
        MUDFROG.utils.deleteDelayed(msg, 4000);
        msg.channel.send(MUDFROG.utils.grab(`You need to supply a question.`, `Um, what did you want to ask?`, `Am I supposed to make up a question?`)).then(function(msg) {
            MUDFROG.utils.deleteDelayed(msg, 4000);
        });
        return;
    }

    if (msg.args[1] !== undefined) {
        screen.setDescription(`**Options:**\n**1:** ${msg.args[1]}\n`);
    } else {
        MUDFROG.utils.deleteDelayed(msg, 4000);
        msg.channel.send(MUDFROG.utils.grab(`Please add at least two options.`, `How is this a vote if there's only one option?`)).then(function(msg) {
            MUDFROG.utils.deleteDelayed(msg, 4000);
        });
        return;
    }

    if (msg.args[2] !== undefined) {
        screen.setDescription(`${screen.description}**2:** ${msg.args[2]}\n`);
    }

    if (msg.args[3] !== undefined) {
        screen.setDescription(`${screen.description}**3:** ${msg.args[3]}\n`);
    }

    if (msg.args[4] !== undefined) {
        screen.setDescription(`${screen.description}**4:** ${msg.args[4]}\n`);
    }

    if (msg.args[5] !== undefined) {
        screen.setDescription(`${screen.description}**5:** ${msg.args[5]}\n`);
    }


    screen.setDescription(`${screen.description}React to the corrosponding emoji of whichever option you want to vote for.`)
    .addField("----------------------------------------------------------------------", "_Mudfrog " + MUDFROG.config.botVersion + " - developed by CircuitLord_")
    msg.delete();
    msg.channel.send(screen)
    
    
    


    //Test how many inputs have already been given in the command and build what it can of the vote.
/*

    var i = 0;

    if (msg.args[0] !== undefined) {
        i++
        screen.setDescription(`${msg.args[0]}\n`, false);
    }

    if (msg.args[1] !== undefined) {
        i++
        screen.setDescription(`${screen.description} **1:** ${msg.args[1]}\n`)
    }

    if (msg.args[2] !== undefined) {
        i++
        screen.setDescription(`${screen.description} **2:** ${msg.args[2]}\n`)
    }

    if (msg.args[3] !== undefined) {
        i++
        screen.setDescription(`${screen.description} **3:** ${msg.args[2]}\n`)
    }

    screen.setDescription(`${screen.description} Type \`-add [option]\` to add more options to the vote.`)

    var screenMsg;

    msg.channel.send(screen).then(function(msg) {
        screenMsg = msg;

        screenMsg.awaitMessages(filter, {max: 1, time: 60000})
        .then(collected => console.log(collected))
        


    });

    

    

    */
    




}