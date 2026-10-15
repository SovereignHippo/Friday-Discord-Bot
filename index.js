// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Guild } = require('discord.js');
require('dotenv').config();

// Create a new client instance and define intents
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});

//all lowercase the word that triggers the bot
const WakeWord = "friday ";


// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Listen for messages and reply to a specific command
client.on(Events.MessageCreate, message => {
    OnClient(message);
});

async function OnClient(message){
    // Prevent the bot from responding to itself
    if (message.author.bot) return;

    //lower case the message
    let messageText = message.content.toLowerCase();

    //check for wake word
    if(messageText.substring(0,WakeWord.length) != WakeWord) return;

    //sets messageText to only the message after frifay
    messageArray = messageText.split(" ");

    switch(messageArray[1]){

        case "hello":
            message.channel.send("Hello");
            break;
        case "kill":
            if(messageArray[2]){ //message 2 is the name of the person to timeout

                //user can timeout self
                if(messageArray[2] == "me" || messageArray[2] == "myself"){
                    //set target to the user who sent it
                    
                    messageArray[2] = message.author.username;
                }
                //The user who is going to be banned
                let targetUser;
                try{
                    //Find the refrence to the target user
                    const matchingMembers = await message.guild.members.fetch({
                    query: messageArray[2],
                    limit: 1 // Fetch only the closest match
                    });
                    
                    targetUser = matchingMembers.first();
                }catch(error){
                    console.error('Error fetching member:', error);
                    message.channel.send("Error");
                    return;
                }

                if(!targetUser){
                    //Check if a user was found
                    message.channel.send("Who is that?");
                    return;
                }
                
                try{
                    //Time them out
                    const timeoutReason = message.username + " orded me to kill you.";

                    //time out in minutes
                    const timeoutTime = 5;
                    //Time out time is in ms
                    await targetUser.timeout(60000 * timeoutTime,timeoutReason)
                    message.channel.send("Right away sir.");
                }catch(error){
                    //Failed to time out for some reason
                    message.channel.send("I'm not strong enough sir.");
                }
            }
            break;
        default:
            message.channel.send("What do you want??");
    }
    
}



// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
