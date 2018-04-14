const Discord = require("discord.js");
const ai = require("../functions/ai.js")
const utils = require("../functions/circuit-utils.js");
//const home = require("./homeResponses.json")
const config = require("../config.json");

const home = require("./homeScreens.json");



var activeHomes = {};






function makeScreen(name, username) {
    console.log("Making screen: " + name)

    const newScreen = new Discord.RichEmbed();
    newScreen.setColor(0x00AE86)

    if (home[name] === undefined) return;

    //Get the title of the screen.
    if (home[name].title.constructor === Array) {
        newScreen.setAuthor(utils.getRandomArray(home[name].title).replace("{user}", username))
    } else {
        newScreen.setAuthor(utils.getRandomArray(home[name].title).replace("{user}", username))
    }

    //Get the first field.
    if (home[name].opt1.name == "blank") {
        newScreen.addBlankField(false);
    } else {
        newScreen.addField(home[name].opt1.name, utils.getRandomArray(home[name].opt1.descs).replace("{user}", username), false)
    }


    if (home[name].opt2.name == "blank") {
        newScreen.addBlankField(false);
    } else {
        newScreen.addField(home[name].opt2.name, utils.getRandomArray(home[name].opt2.descs).replace("{user}", username), false)
    }


    if (home[name].opt3.name == "blank") {
        newScreen.addBlankField(false);
    } else {
        newScreen.addField(home[name].opt3.name, utils.getRandomArray(home[name].opt3.descs).replace("{user}", username), false)
    }


    if (home[name].opt4.name == "blank") {
        newScreen.addBlankField(false);
    } else {
        newScreen.addField(home[name].opt4.name, utils.getRandomArray(home[name].opt4.descs).replace("{user}", username), false)
    }


    if (home[name].opt5.name == "blank") {
        newScreen.addBlankField(false);
    } else {
        newScreen.addField(home[name].opt5.name, utils.getRandomArray(home[name].opt5.descs).replace("{user}", username), false)
    }

    if (home[name].opt6.name == "blank") {
        newScreen.addBlankField(false);
    } else {
        newScreen.addField(home[name].opt6.name, utils.getRandomArray(home[name].opt6.descs).replace("{user}", username), false)
    }




    newScreen.addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_");


    return newScreen;

}







exports.newHome = (message) => {
    console.log("Making new home...");

    const username = message.author.username;
    const guildID = message.guild.id.toString();
    const userID = message.author.id.toString();
    const messageID = message.id;
    const content = message.content;
    const channel = message.channel;

    const userDatabaseID = (guildID + "-" + userID);


    var screen = makeScreen("home", username);


    //Init home screen.
    message.channel.send(screen).then(async function(message) {
        const homeMessageID = message.id;

        activeHomes[homeMessageID] = {
            "state" : "home",
            "owner" : userID
        }


        await message.react("🏠");
        await message.react("⬅")
        await message.react("\u0031\u20e3");
        await message.react("\u0032\u20e3");
        await message.react("\u0033\u20e3");
        await message.react("\u0034\u20e3");
        await message.react("\u0035\u20e3");
        await message.react("\u0036\u20e3");
        await message.react("❌");

    });











}


exports.updateScreen = (messageReaction, user) => {
    const messageID = messageReaction.message.id;
    const reaction = messageReaction.emoji.name;
    const message = messageReaction.message;
    const username = messageReaction.message.author.username;

    if (activeHomes[messageID] === null) return;
    console.log(reaction)
    messageReaction.remove(user);


    if (reaction == "🏠") {
        console.log("home")
        message.edit(makeScreen("home", username));
        activeHomes[messageID].state = "home"
        return;
    }

    if (reaction == "❌") {
        message.delete();
        activeHomes[messageID] = null;
        return;
    }

    if (reaction == "1⃣") {
        message.edit(makeScreen(home[activeHomes[messageID].state].opt1.dest));

        activeHomes[messageID].state = home[activeHomes[messageID].state].opt1.dest
        return;
    }

    if (reaction == "2⃣") {
        message.edit(makeScreen(home[activeHomes[messageID].state].opt2.dest));
        activeHomes[messageID].state = home[activeHomes[messageID].state].opt2.dest
        return;
    }

    if (reaction == "3⃣") {
        message.edit(makeScreen(home[activeHomes[messageID].state].opt3.dest));
        activeHomes[messageID].state = home[activeHomes[messageID].state].opt3.dest
        return;
    }

    if (reaction == "4⃣") {
        message.edit(makeScreen(home[activeHomes[messageID].state].opt4.dest));
        activeHomes[messageID].state = home[activeHomes[messageID].state].opt4.dest
        return;
    }

    if (reaction == "5⃣") {
        message.edit(makeScreen(home[activeHomes[messageID].state].opt5.dest));
        activeHomes[messageID].state = home[activeHomes[messageID].state].opt5.dest
        return;
    }

    if (reaction == "6⃣") {
        message.edit(makeScreen(home[activeHomes[messageID].state].opt6.dest));
        activeHomes[messageID].state = home[activeHomes[messageID].state].opt6.dest
        return;
    }




}













exports.newReaction = (messageReaction, user) => {


    const messageID = messageReaction.message.id;
    const reaction = messageReaction.emoji.name;
    const message = messageReaction.message;



    if (activeHomes[messageID] === null) return;
    console.log(reaction)
    messageReaction.remove(user);



    if (reaction == "🏠") {
        console.log("home")
        message.edit(exports.homeScreen(user.username));
        activeHomes[messageID].state = "home"

        return;
    }

    if (reaction == "❌") {
        message.delete();
        activeHomes[messageID] = null;
        return;
    }

    if (reaction == "⬅") {
        console.log("back")
        console.log(activeHomes[messageID].state)


        if (activeHomes[messageID].state === "home-commands") {
            
            message.edit(exports.homeScreen(user.username));
            activeHomes[messageID].state = "home"
            return;
        }

        if (activeHomes[messageID].state === "home-options") {
            message.edit(exports.homeScreen(user.username));
            activeHomes[messageID].state = "home"
            return;
        }

        if (activeHomes[messageID].state === "home-commands-memeCommands") {
            message.edit(exports.commandsScreen(messageID));
            activeHomes[messageID].state = "home-commands"
            return;
        }

    }



    if (activeHomes[messageID].state == "home") {

        //1
        if (reaction == "1⃣") {
            message.edit(exports.commandsScreen(messageID));
            return;
        }

        if (reaction == "2⃣") {
            message.edit(exports.optionsScreen(messageID));
            return;
        }



    }

    else if (activeHomes[messageID].state == "home-commands") {

        //1
        if (reaction == "1⃣") {
            message.edit(exports.commandsScreen(messageID));
            return;
        }

        if (reaction == "2⃣") {
            message.edit(exports.optionsScreen(messageID));
            return;
        }

        if (reaction == "3⃣") {
            message.edit(exports.memeCommandsScreen(messageID));
            return;
        }

        if (reaction == "4⃣") {
            message.edit(exports.optionsScreen(messageID));
            return;
        }



    }




}
















exports.commandsScreen = (messageID) => {
    activeHomes[messageID].state = "home-commands"
    const reCommandsScreen = new Discord.RichEmbed()
    .setAuthor("Commands:")
    .setColor(0x00AE86)
    .addField("1: Admin Commands", utils.getRandomArray(home.commands.adminCommandsDesc))


    .addField("2: Automation Commands", utils.getRandomArray(home.commands.automationCommandsDesc))
    .addField("3: Meme Commands", utils.getRandomArray(home.commands.memeCommandsDesc))
    .addField("4: Misc. Commands", utils.getRandomArray(home.commands.miscCommandsDesc))
    .addBlankField(false)
    .addBlankField(false)
    .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_");

    return reCommandsScreen;


}

exports.optionsScreen = (messageID) => {
    activeHomes[messageID].state = "home-options"
    const reCommandsScreen = new Discord.RichEmbed()
    .setAuthor("Options:")
    .setColor(0x00AE86)
    .addField("1: Enable and Disable Modules", utils.getRandomArray(home.options.moduleSettingsDesc))
    

    //.addField("2: Options", utils.getRandomArray(home.home.optionsDesc), true)
    .addBlankField(false)
    .addBlankField(false)
    .addBlankField(false)
    .addBlankField(false)
    .addBlankField(false)
    .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_");

    return reCommandsScreen;


}

exports.homeScreen = (username) => {
    const reHomeScreen = new Discord.RichEmbed()
    .setAuthor(utils.getRandomArray(home.home.welcome).replace("{user}", username))
    //.setTitle("Testing.")
    .setColor(0x00AE86)
    //.setDescription("Use this to get stats about your XP, Level, and ranking.")
    .addField("1: Commands", utils.getRandomArray(home.home.commandsDesc).replace("{user}", username, true))

    .addField("2: Options", utils.getRandomArray(home.home.optionsDesc), false)


    .addBlankField(false)
    .addBlankField(false)
    .addBlankField(false)
    .addBlankField(false)
    
    .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_");

    return reHomeScreen;



}

exports.memeCommandsScreen = (messageID) => {
    activeHomes[messageID].state = "home-commands-memeCommands"
    const reCommandsScreen = new Discord.RichEmbed()
    .setAuthor("Meme Commands:")
    .setColor(0x00AE86)
    .addField("1: PERMBAN", utils.getRandomArray(home.memeCommands.permbanDesc))


    .addBlankField(false)
    .addBlankField(false)
    .addBlankField(false)
    .addBlankField(false)
    .addBlankField(false)
    .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_");

    return reCommandsScreen;


}