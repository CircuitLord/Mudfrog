const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const utils = require("./utils/circuit-utils.js");

const jf = require("jsonfile");


var config = jf.readFileSync("./config.json")

var serverConfigs = {};
const usersExist = [];
const usersGotXp = [];

var tempRemind;



/*
    This code has gotten messy, will be re-written soon.
    
*/




client.on("ready", function (message) {
    console.log(`Mudfrog ${config.botVersion} is ready to go.`);
    xpTimer()
});

function xpTimer() {
    usersGotXP = [];
    setTimeout(xpTimer, 60000);
}


client.on("messageReactionAdd", function (messageReaction, user) {
    if (user.bot === true) return;

    var home = require("./home/home.js");

    const messageID = messageReaction.message.id;


    home.updateHome(messageReaction, user);


});


client.on("message", function (message) {

    if (message.author.bot == true) return;
    if (message.channel.type === "dm") return;


    //Load the server config into memory and make sure all users have a database entry.
    if (serverConfigs[message.guild.id] === undefined) {
        console.log("Loading config.");

        //Generate new config if needed.
        if (fs.existsSync("./serverConfigs/" + message.guild.id + ".json") == false) {
            console.log("Generating new config for " + message.guild.name + ".")
            jf.writeFileSync("./serverConfigs/" + message.guild.id + ".json", jf.readFileSync("./configTemplate.json"));
        }

        //Database entry stuff here.

        serverConfigs[message.guild.id] = jf.readFileSync(`./serverConfigs/${message.guild.id}.json`);
    }



    //Test if the message is a command.
    var command;
    if (message.content.startsWith(serverConfigs[message.guild.id].prefix)) {
        command = message.content.substr(1).split(" ")[0].toLowerCase();
    }


    message.username = message.author.username;
    message.userID = message.author.id;
    message.command = command;
    message.userDBID = message.author.id + "-" + message.guild.id;
    message.sConfig = serverConfigs[message.guild.id]

    var msg = {
        "content": message.content,
        "channel": message.channel,
        "username": message.author.username,
        "userID": message.author.id,
        "guild": message.guild,
        "command": command,
        "userDatabaseID": message.author.id + "-" + message.guild.id,
        process: function () {
            console.log("wow cool")
        }
    }



    //Test if user exists in database, if not, add them.
    if (usersExist.includes(msg.userDatabaseID) == false) {
        if (utils.fetchStats(msg.userDatabaseID) == null) {
            utils.addNewUser(msg);
            console.log("New user.");
            usersExist.push(msg.userDatabaseID);
        }
    }



    //Test if bot should give user EXP.
    if (command === undefined && serverConfigs[msg.guild.id].modules.xp == true && usersGotXp.includes(msg.userDatabaseID) == false) {
        usersGotXp.push(msg.userDatabaseID);
        console.log("giving xp")
        utils.updateXP(msg.userDatabaseID);
    }






    //Commands handler.
    //if (msg.command !== undefined && fs.existsSync(`./commands/${msg.command}.js`) == true) {
        //if (msg.command.startsWith("..")) return;

       // try {
        //    require(`./commands/${msg.command}`).run(msg)
        //} catch (e) {
        //    console.log(e)
        //    console.log(`${msg.command} can't be run.`)
       // }


   // }


    //Setup command only the owner can run.
    if (msg.command == "setup" && msg.guild.ownerID == msg.userID) {
        msg.process();


        message.guild.members.forEach(function (member) {
            console.log(member.user.username)
        });



        require("./botSetup.js").run(msg);
        message.delete();
    }


    if (msg.command == "home") {
        require("./home/home.js").init(message);
    }


    if (command == "rulesembed") {
        var test = new Discord.RichEmbed()
        .setAuthor("CircuitLord's YT Community Rules:")
        .setDescription("These are some of the rules. Breaking a rule once will result in a warning. Continuing behavior of breaking rules could result in a mute, or even a ban.")
        .addField("1: Keep it Family Friendly", "This server is open to people of **all ages**, so you need to keep everything you do **family friendly**. **Bad words** and **swearing** are **discouraged**. Do not post any inapproriate or 18+ content.")
        .addField("2: Be Nice", "This server should have a **positive community**. Being mean or insulting other people is discouraged.")
        .addField("3: No Spam", "Just... **Don't do it.** This includes spamming a similar message in attempt to get **attention**, or spam **tagging moderators** for no good reason. I think you get the idea.")
        .addBlankField()
        .addField("And, that's about it!", "I hope you enjoy your stay on the server!")
        .setColor(0xb5111c)

        tempRemind = message;
    
        message.channel.send(test)

    }

    if (command == "rolesembed") {
        var test = new Discord.RichEmbed()
        .setAuthor("Roles:")
        .setDescription("This is a list of all the roles on the server.")
        .addField("1: CircuitLord", "This role is basically just for **CircuitLord only**. If anyone were to ever join my youtube team, which won't happen anytime soon, this is where they'd be.")
        .addField("2: Admins", "The **power is strong** with them. This role basically is what it says. Admins have **control over most** of what goes on here.")
        .addField("3: Moderators (Mods)", "Mods are **toned down admins**. In other words, they have fewer commands, but still can do some **basic stuff to help** out the server.")
        .addField("4: Donators", "These are the **awesome people** who donate to me on patreon! They get access to a **cool private channel** where they can talk about how **awesome** I am and stuff like that.")
        .addField("5: Everyone",  "Hey, it's **you**! (unless you're a higher rank in which case never mind) The everyone role can do all the **standard good stuff** you can do on most discords.")
        .setColor(0xffffe0)

        message.channel.send(test)

    }


    if (command == "modrules") {
        var test = new Discord.RichEmbed()
        .setAuthor("Moderator/Admin Guide:")
        .setDescription("Here are some tips on being a moderator/admin.")
        .addField("1: How to Enforce Rules", "If someone is spamming, or using bad words, and they haven't done it before or recently, this is when you would give a warning.\nYou can either DM the user personally telling them to stop, or use Mudfrog's built in warn feature (yet to come).\nIf said user continues to break the rules, a kick/mute is in order, depending on the severity of the rule they are breaking.\nUse your common sense.")
        .addField("2: Set a Good Example", "I shouldn't really have to explain this one. As a moderator/admin, you need to set a good example. This means, obviously, following the rules and being a cool person :)")
        .addField("3: What to do if You Don't Know What to do", "If you are ever unsure about what to do, ask others in #mod-chat. Myself and other people can give advice about what should be done.")
        .setColor(0x00AE86)

    
        message.channel.send(test)

    }






});



client.on("guildCreate", function (guild) {
    //Triggers when bot joins guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    guild.defaultChannel.send(`Hey there, I'm Mudfrog! Let's get some inital stuff setup.\nRun \`-setup\` in whatever channel you'd like to do the setup in.`)
});







client.login(config.token);