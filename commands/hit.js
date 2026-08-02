const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');
const { getUser, save } = require('../shared/db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hit')
    .setDescription('Take a hit from your vape')
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  async execute(interaction) {
    const { data, user } = getUser(interaction.user.id);

    if (user.battery <= 0) {
      return interaction.reply({ content: '🔋 Your vape is dead. Use /charge', flags: 64 });
    }

    user.puffs += 1;
    user.battery -= 1;
    save(data);

    await interaction.reply({
      content: `💨 hitting the ${user.name}...\n\nPuffs: ${user.puffs}\nBattery: ${user.battery}/50`
    });
  }
};
