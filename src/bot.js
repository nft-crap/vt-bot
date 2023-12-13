require('dotenv').config();
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { Client, Collection, IntentsBitField, GatewayIntentBits } = require('discord.js');

const token = process.env.TOKEN, uri = process.env.MONGO_URI;

const mongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function connectDb() {
    try {
        await mongoClient
            .connect({
                keepAlive: true,
            });

    }
    catch (err) {
        console.log(err.stack);
        await mongoClient.close();
    }
    finally {
        // await mongoClient.close();
    };
};

const myIntents = new IntentsBitField();
const arIntents = [
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    GatewayIntentBits.Guilds
];

arIntents
    .forEach(intent => {
        myIntents.add(intent);
    });

const client = new Client({ 
    intents: myIntents
});

client.commands = new Collection();
client.commandArray = [];

client.connectDb = connectDb;
client.db = mongoClient.db("oncyber");
client.closeDb = mongoClient.close;

const functionFolders = fs.readdirSync('./functions');

for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionFiles)
        require(`../functions/${folder}/${file}`)(client);
};

client.handleEvents();
client.handleCommands();
client.login(token);