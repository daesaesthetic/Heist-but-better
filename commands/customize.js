const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');
const { getUser, save } = require('../shared/db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('customize')
    .setDescription('Customize your vape')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Custom name')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('skin')
        .setDescription('Skin to apply')
        .setRequired(false))
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  async execute(interaction) {
    const { data, user } = getUser(interaction.user.id);

    const name = interaction.options.getString('name');
    const skin = interaction.options.getString('skin');

    if (name) user.name = name;
    if (skin) user.skin = skin;
    save(data);

    await interaction.reply({
      content: `⚙️ Updated your vape:\nName: ${user.name}\nSkin: ${user.skin}`
    });
  }
};
