// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance and define intents
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
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
    // Prevent the bot from responding to itself
    if (message.author.bot) return;

    //lower case the message
    let messageText = message.content.toLowerCase();

    if(messageText.splice(0,6) != WakeWord) return;

    //sets messageText to only the message after frifay
    messageText = messageText.slice(WakeWord.length);

    // A simple ping-pong command
    if (message.content.toLowerCase() === '!ping') {
        message.reply('Pong! 🏓');
    }
});

// Log in to Discord with your client's token
// Replace 'YOUR_BOT_TOKEN' with your actual bot token
client.login('MTU2MDI4NTM3MjY3MDQxODk3Ng.Gt5U_t.zSJH6zBtdUg-blmUrguueq8vHV3qZvRWmHJpg4');
