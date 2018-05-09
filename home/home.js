
const jf = require("jsonfile");
var config = jf.readFileSync("./config.json")
const Discord = require("discord.js");

const activeHomes = {};


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

function canRunCycle(current) {
    if (current === "Owner only.") {
        return "Owner and Admins.";
    }
    if (current === "Owner and Admins.") {
        return "Owner, Admins, and Mods.";
    }
    if (current === "Owner, Admins, and Mods.") {
        return "Owner only.";
    }
    return "Owner only."
}




exports.init = (msg) => {
    msg.delete();
    var oldMsg = msg;


    const home = {


        "home": {
            title:
                grab(
                    `Hey there, ${msg.author.username}!`, 
                    `How can I help you, ${msg.author.username}?`, 
                    `What's up ${msg.author.username}?`
                ),
        
                    
                
    
            opt1: {
                title: "1: Commands",
                desc: grab(
                    "Use fancy words to make me do cool things!",
                    "This is where the magic happens.",
                    "The best part.",
                    "`-permban {user} 200d this is not an example`",
                    "Go here, it's cool.",
                    "Lots of complex commands for you to enjoy."
                ),
                dest: "commands",
                action: function(msg) {
                        home[this.dest].send(msg)
    
    
    
                }
    
    
    
    
    
    
                },
    
                opt2: {
                    title: "2: Options",
                    desc: grab(
                        "Break all my settings here.",
                        "Tweak everything to your desire.",
                        "Opening this voids your warrenty.",
                        "ERROR 404, home.opt2.desc not found",
                        "Wait, they can change my settings?"
                    ),
                    dest: "options",
                    action: function(msg) {
                        home[this.dest].send(msg)
                    }

                },
    
                send: function(msg) {
                    msg.edit(new Discord.RichEmbed()
                        .setAuthor(this.title)
                        .addField(this.opt1.title, this.opt1.desc)
                        .addField(this.opt2.title, this.opt2.desc)
                        .addBlankField()
                        .addBlankField()
                        .addBlankField()
                        .addBlankField()
                        .setColor(0xb5111c)
                        .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_")
                
                    )
                    
                },


                initHome: function(msg) {
                    msg.edit(new Discord.RichEmbed()
                        .setAuthor(this.title)
                        .addField(this.opt1.title, this.opt1.desc)
                        .addField(this.opt2.title, this.opt2.desc)
                        .addBlankField()
                        .addBlankField()
                        .addBlankField()
                        .addBlankField()
                        .setColor(0xb5111c)
                        .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_")
                
                    ).then(function(msg) {
                        activeHomes[msg.id] = {
                            msg: msg,
                            home: home,
                            owner: oldMsg.author.id,
                            username: oldMsg.author.username,
                            currentScreen: "home",
                            previousScreen: ""
                        }
                    });
                }


                
                    
                    
    
    
    
    
            
    
        },



        "commands": {
            title: "Commands:",
        
                    
                
    
            opt1: {
                title: "1: Admin Commands",
                desc: grab(
                    "The cool people place.",
                    "Use these to destroy the server.",
                    "Someone annoying you? You've come to the right place.",
                    "Commands to ruin other people's lives."
                ),

                dest: "commandsAdmin",
                action: function(msg) {
                        home[this.dest].send(msg)
    
    
    
                }
    
    
    
    
    
    
            },
    
            opt2: {
                title: "2: Automation Commands",
                desc: grab(
                    "Commands like -vote, to make your life cooler and easier.",
                    "Are you lazy or just want a better way to do stuff? Go here.",
                    "For the lazy ones.",
                    "Because we can."
                    ),
                dest: "commandsAutomation",
                action: function(msg) {
                    home[this.dest].send(msg)
                }

            },

            opt3: {
                title: "3: Meme Commands",
                desc: grab(
                    "The funny, pointless commands that don't fit anywhere else.",
                    "lol",
                    "Useless commands.",
                    "For all the bad commands.",
                    "This was a huge mistake..."
                    ),
                dest: "commandsMeme",
                action: function(msg) {
                    home[this.dest].send(msg)
                }

            },

            opt4: {
                title: "4: Misc. Commands",
                desc: grab(
                    "For the commands too small for their own catagory.",
                    "Random commands and stuff.",
                    "Leftovers from the other catagories.",
                    "Who knows what's in here?"
                    ),
                dest: "commandsMisc",
                action: function(msg) {
                    home[this.dest].send(msg)
                }

            },
    
            send: function(msg) {
                msg.edit(new Discord.RichEmbed()
                    .setAuthor(this.title)
                    .addField(this.opt1.title, this.opt1.desc)
                    .addField(this.opt2.title, this.opt2.desc)
                    .addField(this.opt3.title, this.opt3.desc)
                    .addField(this.opt4.title, this.opt4.desc)
                    .addBlankField()
                    .addBlankField()
                    .setColor(0xb5111c)
                    .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_")
                
                )
                    
            }



                    
    
    
    
    
            
    
        },
        


        "commandsAdmin": {
            title: "Admin Commands:",
        
                    
                
    
            opt1: {
                title: "1: Mute",
                desc: grab(
                    "Make someone be quiet.",
                    "Takes away a user's voice.",
                    "For the annoying ones."
                ),

                dest: "commandsAdminMute",
                action: function(msg) {
                    home[this.dest].send(msg)
                }
    
            },
    
            opt2: {
                title: "2: Ban",
                desc: grab(
                    "Remove people with _style_.",
                    "Better than the discord interface.",
                    "Get off my server."
                    ),
                dest: "commandsAdminBan",
                action: function(msg) {
                    home[this.dest].send(msg)
                }

            },

            opt3: {
                title: "3: Warn",
                desc: grab(
                    "The funny, pointless commands that don't fit anywhere else.",
                    "lol",
                    "Useless commands.",
                    "For all the bad commands.",
                    "This was a huge mistake..."
                    ),
                dest: "commandsAdminWarn",
                action: function(msg) {
                    home[this.dest].send(msg)
                }

            },


    
            send: function(msg) {
                msg.edit(new Discord.RichEmbed()
                    .setAuthor(this.title)
                    .addField(this.opt1.title, this.opt1.desc)
                    .addField(this.opt2.title, this.opt2.desc)
                    .addField(this.opt3.title, this.opt3.desc)
                    .addBlankField()
                    .addBlankField()
                    .addBlankField()
                    .setColor(0xb5111c)
                    .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_")
                
                )
                    
            }



                    
    
    
    
    
            
    
        },
        

        "commandsAdminMute": {
            title: "Mute:",
        
            opt1: {
                title: "1: Who can run:",
                desc: "Owner, Admins, and Mods.",

                dest: "commandsAdminMute",
                action: function(msg) {
                    serverConfig = jf.readFileSync(`./serverConfigs/${msg.guild.id}.json`);
                    this.desc = canRunCycle(serverConfig.modules.adminCommands.mute.canRun);
                    serverConfig.modules.adminCommands.mute.canRun = this.desc;
                    jf.writeFileSync("./serverConfigs/" + msg.guild.id + ".json", serverConfig);



                    home[this.dest].send(msg)
                }
    
            },

    
            send: function(msg) {
                msg.edit(new Discord.RichEmbed()
                    .setAuthor(this.title)
                    .addField(jf.readFileSync(`./serverConfigs/${msg.guild.id}.json`).prefix + "mute <@username> [time in mins] [reason]", "Use this command to silence a user for an optional amount of time.\nExample: `-mute @CircuitLord 20 bad programming practices`")
                    .addField(this.opt1.title, this.opt1.desc)
                    .addBlankField()
                    .addBlankField()
                    .addBlankField()
                    .addBlankField()
                    .setColor(0xb5111c)
                    .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_")
                
                )
                    
            }



                    
    
    
    
    
            
    
        },
        
        
        "commandsAdminBan": {
            title: "Ban:",
        
            opt1: {
                title: "1: Who can run: (BE CAREFUL)",
                desc: "Owner and Admins.",

                dest: "commandsAdminBan",
                action: function(msg) {
                    serverConfig = jf.readFileSync(`./serverConfigs/${msg.guild.id}.json`);
                    this.desc = canRunCycle(serverConfig.modules.adminCommands.ban.canRun);
                    serverConfig.modules.adminCommands.ban.canRun = this.desc;
                    jf.writeFileSync("./serverConfigs/" + msg.guild.id + ".json", serverConfig);



                    home[this.dest].send(msg)
                }
    
            },

    
            send: function(msg) {
                msg.edit(new Discord.RichEmbed()
                    .setAuthor(this.title)
                    .addField(jf.readFileSync(`./serverConfigs/${msg.guild.id}.json`).prefix + "ban <@username> [reason]", "Someone bothering you? Not a problem. Use this command to ban people from your server.\nExample: `-ban @CircuitLord L noob`")
                    .addField(this.opt1.title, this.opt1.desc)
                    .addBlankField()
                    .addBlankField()
                    .addBlankField()
                    .addBlankField()
                    .setColor(0xb5111c)
                    .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_")
                
                )
                    
            }



                    
    
    
    
    
            
    
        }
        
        
        
        
        
        
    }











    msg.channel.send(new Discord.RichEmbed()
        .setAuthor("Loading")
        .addBlankField(false)
        .addBlankField()
        .addBlankField()
        .addBlankField()
        .addBlankField()
        .addBlankField()
        .setColor(0xb5111c)
        .addField("----------------------------------------------------------------------", "_Mudfrog " + config.botVersion +" - developed by CircuitLord_")
    ).then(async function(msg) {
        home.home.initHome(msg)
        await msg.react("🏠");
        await msg.react("⬅")
        await msg.react("\u0031\u20e3");
        await msg.react("\u0032\u20e3");
        await msg.react("\u0033\u20e3");
        await msg.react("\u0034\u20e3");
        await msg.react("\u0035\u20e3");
        await msg.react("\u0036\u20e3");
        await msg.react("❌");
    });







}






exports.updateHome = (messageReaction, user) => {
    const msg = messageReaction.message;
    const reaction = messageReaction.emoji.name;



    if (activeHomes[msg.id] === null) return;
    messageReaction.remove(user);

    if (reaction == "❌") {
        activeHomes[msg.id] = null;
        setTimeout(function() {
            msg.delete();
            }, 1000)
        return;
    }

    if (reaction == "🏠") {
        activeHomes[msg.id].home.home.send(activeHomes[msg.id].msg)
        activeHomes[msg.id].currentScreen = "home";
        return;
    }

    if (reaction == "⬅") {
        activeHomes[msg.id].home[activeHomes[msg.id].previousScreen].send(activeHomes[msg.id].msg);
        activeHomes[msg.id].currentScreen = activeHomes[msg.id].previousScreen;
    }

    if (reaction == "1⃣") {
        var option = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt1;

        if (option === null || option === undefined) return;
        activeHomes[msg.id].previousScreen = activeHomes[msg.id].currentScreen;
        activeHomes[msg.id].currentScreen = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt1.dest
        option.action(activeHomes[msg.id].msg)


        return;
    }

    if (reaction == "2⃣") {
        var option = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt2;
        
        if (option === null || option === undefined) return;
        activeHomes[msg.id].previousScreen = activeHomes[msg.id].currentScreen;
        activeHomes[msg.id].currentScreen = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt2.dest
        option.action(activeHomes[msg.id].msg)


        return;
    }


    if (reaction == "3⃣") {
        var option = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt3;
        
        if (option === null || option === undefined) return;
        activeHomes[msg.id].previousScreen = activeHomes[msg.id].currentScreen;
        activeHomes[msg.id].currentScreen = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt3.dest;
        option.action(activeHomes[msg.id].msg)


        return;
    }

    if (reaction == "4⃣") {
        var option = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt4;
        
        if (option === null || option === undefined) return;
        activeHomes[msg.id].previousScreen = activeHomes[msg.id].currentScreen;
        activeHomes[msg.id].currentScreen = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt4.dest
        option.action(activeHomes[msg.id].msg)


        return;
    }

    if (reaction == "5⃣") {
        var option = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt5;
        
        if (option === null || option === undefined) return;
        activeHomes[msg.id].previousScreen = activeHomes[msg.id].currentScreen;
        activeHomes[msg.id].currentScreen = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt5.dest
        option.action(activeHomes[msg.id].msg)


        return;
    }

    if (reaction == "6⃣") {
        var option = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt6;
        
        if (option === null || option === undefined) return;
        activeHomes[msg.id].previousScreen = activeHomes[msg.id].currentScreen;
        activeHomes[msg.id].currentScreen = activeHomes[msg.id].home[activeHomes[msg.id].currentScreen].opt6.dest
        option.action(activeHomes[msg.id].msg)


        return;
    }



    








}
