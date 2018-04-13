const Discord = require("discord.js");
const ai = require("../functions/ai.js")
const utils = require("../functions/circuit-utils.js");
const home = require("./homeResponses.json")




var activeHomes = {};












exports.initHomeScreen = (message) => {
    console.log("homescreen running")
    const username = message.author.username;
    const guildID = message.guild.id.toString();
    const userID = message.author.id.toString();
    const messageID = message.id;
    const content = message.content;
    const channel = message.channel;

    const userDatabaseID = (guildID + "-" + userID);

    message.delete()

    message.channel.send(exports.homeScreen(username)).then(async function(message) {
        const homeMessageID = message.id;

        activeHomes[homeMessageID] = {
            "state" : "home"
        }

        await message.react("🏠");
        await message.react("◀")
        await message.react("\u0031\u20e3");
        await message.react("\u0032\u20e3");
        await message.react("\u0033\u20e3");
        await message.react("\u0034\u20e3");
        await message.react("\u0035\u20e3");
        await message.react("\u0036\u20e3");
        await message.react("❌");
        
        


        const emojiIDArray = [`\u0031\u20e3`, `\u0032\u20e3`, `\u0033\u20e3`, `\u0034\u20e3`, `\u0035\u20e3`, `\u0036\u20e3`, `\u0037\u20e3`];


    })






}








exports.newReaction = (messageReaction, user) => {


    const messageID = messageReaction.message.id;
    const reaction = messageReaction.emoji.name;
    const message = messageReaction.message;



    if (activeHomes[messageID] === null) return;

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

    if (reaction == "◀") {
        console.log("back")
        console.log(activeHomes[messageID].state)


        if (activeHomes[messageID].state = "home-commands") {
            
            message.edit(exports.homeScreen(user.username));
            activeHomes[messageID].state = "home"
            return;
        }

        if (activeHomes[messageID].state = "home-options") {
            message.edit(exports.homeScreen(user.username));
            activeHomes[messageID].state = "home"
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




}
















exports.commandsScreen = (messageID) => {
    activeHomes[messageID].state = "home-commands"
    const reCommandsScreen = new Discord.RichEmbed()
    .setAuthor("Commands:")
    .setColor(0x00AE86)
    .addField("1: Admin Commands", utils.getRandomArray(home.commands.adminCommandsDesc))
    

    //.addField("2: Options", utils.getRandomArray(home.home.optionsDesc), true)
    .addField("2: example0", "Cool description", false)
    .addField("3: example1", "Cool description", false)
    .addField("4: example2", "Cool description", false)
    .addField("5: example3", "Cool description", false)
    .addField("6: example4", "Cool description", false)

    return reCommandsScreen;


}

exports.optionsScreen = (messageID) => {
    activeHomes[messageID].state = "home-options"
    const reCommandsScreen = new Discord.RichEmbed()
    .setAuthor("Options:")
    .setColor(0x00AE86)
    .addField("1: Enable and Disable Modules", utils.getRandomArray(home.options.moduleSettingsDesc))
    

    //.addField("2: Options", utils.getRandomArray(home.home.optionsDesc), true)
    .addField("2: example0", "Cool description", false)
    .addField("3: example1", "Cool description", false)
    .addField("4: example2", "Cool description", false)
    .addField("5: example3", "Cool description", false)
    .addField("6: example4", "Cool description", false)

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

    .addField("3: example1", "Cool description", false)
    .addField("4: example2", "Cool description", false)
    .addField("5: example3", "Cool description", false)
    .addField("6: example4", "Cool description", false)

    return reHomeScreen;



}