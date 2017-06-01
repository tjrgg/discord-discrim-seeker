console.log("DISCORD DISCRIM SEEKER || created by Tyler#0130");

const config = require("./config.json");

const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true });

const discrimSeeker = async () => {
    let users = client.users.filter(u => u.discriminator === client.user.discriminator);
    if (users.size < 1) {
        console.error("A user wasn't found with your current discriminator, which doesn't allow this selfbot to work. (Join more servers.)");
        process.exit();
    }
    let user = users.random();
    try {
        await client.user.setUsername(user.username, config.password);
        if (config.discriminator.indexOf(client.user.discriminator) > -1) {
            console.log("One of your choosen discriminators was selected. Will set your username in 5 minutes. DO NOT EXIT THIS PROGRAM.");
            client.setTimeout(() => {
                try {
                    console.log("Setting your username...");
                    await client.user.setUsername(config.username, config.password);
                    console.log("Username set. Exiting...");
                    process.exit();
                }
                catch (e) {
                    console.error("Your username failed to reset to your preferred username. You'll have to manually reset your username.");
                    process.exit();
                }
            }, 300000);
        }
        else return console.log("The selected discriminator was not one of your preferred discriminators. Will reset your username in 30 minutes.");
    }
    catch (e) {
        console.error("Your username failed to set.");
        console.error(e);
    }
    
};

client.on("ready", () => {
    console.log("Alright, let's do this. Will change your username in 10 seconds.");
    client.setTimeout(() => discrimSeeker(), 10000);
    client.setInterval(() => discrimSeeker(), 1800000);
});

client.login(config.token);