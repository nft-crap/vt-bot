const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');

const wdir = path.join(__dirname, '../../commands');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync(wdir);
        const { GUILD, TOKEN, USER } = process.env;

        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`${wdir}/${folder}`)
                .filter(file => file.endsWith('.js'));
            
            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`${wdir}/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            };
        };

        const rest = new REST({ version: '9' })
            .setToken(TOKEN);

        try {
            console.log('Started refreshing application (/) commands.');
            
            await rest.put(Routes.applicationGuildCommands(USER, GUILD), { 
                body: client.commandArray 
            });

            console.log('Successfully reloaded application (/) commands.');
        } 
        catch (error) {
            console.error(error);
        };
    };
};