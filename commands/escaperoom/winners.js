const fs = require('node:fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('winners')
        .setDescription('List winners of an escape room')
        .addStringOption(option => 
            option
                .setName('space')
                .setDescription('The space to list winners of.')
                .setRequired(true)),
	async execute(interaction, client) {
        try {
            await interaction.deferReply({
                fetchReply: true
            });

            const space = interaction.options.getString('space');

            const { db } = client;

            const allWinners = await db
                .collection('winners')
                .find({})
                .toArray();

            const winners = allWinners
                .filter(winner => winner.space_id === space)
                .map(winner => winner.address);

            const tempFilename = `${space}.txt`;

            fs.writeFileSync(tempFilename, winners.length > 0 ? winners.join(`,1\n`)+`,1` : `No winners yet!` );

            await interaction.editReply({
                content: `Winners for ${space}:`,
                files: [tempFilename],
            });

            fs.unlinkSync(tempFilename);
        } 
        catch (error) {
            console.log(error);
            await interaction.editReply({
                content: `Error`
            });
        };
	},
};