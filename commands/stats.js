const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');
const { getUser } = require('../shared/db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Check your vape stats')
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  async execute(interaction) {
    const user = await getUser(interaction.user.id);

    const batteryBar = '🟩'.repeat(Math.round(user.battery / 5)) + '⬛'.repeat(10 - Math.round(user.battery / 5));

    await interaction.reply({
      content: `📊 **${user.name}** (${user.skin} skin)\n\n💨 Puffs: ${user.puffs}\n🔋 Battery: ${user.battery}/50\n${batteryBar}`
    });
  }
};
