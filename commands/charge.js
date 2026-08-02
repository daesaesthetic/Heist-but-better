const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');
const { getUser, saveUser } = require('../shared/db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('charge')
    .setDescription('Charge your vape back to full')
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  async execute(interaction) {
    const user = await getUser(interaction.user.id);

    if (user.battery >= 50) {
      return interaction.reply({ content: '🔋 Your vape is already fully charged!', flags: 64 });
    }

    user.battery = 50;
    await saveUser(interaction.user.id, user);

    await interaction.reply({
      content: `⚡ Charged up! Your ${user.name} is back to full.\n\nBattery: ${user.battery}/50`
    });
  }
};
