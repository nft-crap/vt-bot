module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) 
                return;

            try {
                command.execute(interaction, client);
            }
            catch (error) {
                console.error(error);
                interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            };
        };
    },
};