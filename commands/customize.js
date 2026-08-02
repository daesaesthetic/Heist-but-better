const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');
const fs = require('fs');

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
    const userId = interaction.user.id;
    let data = {};

    if (fs.existsSync('./data/users.json')) {
      data = JSON.parse(fs.readFileSync('./data/users.json'));
    }

    if (!data[userId]) {
      data[userId] = {
        puffs: 0,
        battery: 50,
        name: 'Vaporella',
        skin: 'default'
      };
    }

    let user = data[userId];

    const name = interaction.options.getString('name');
    const skin = interaction.options.getString('skin');

    if (name) user.name = name;
    if (skin) user.skin = skin;

    fs.writeFileSync('./data/users.json', JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `⚙️ Updated your vape:\nName: ${user.name}\nSkin: ${user.skin}`
    });
  }
};
