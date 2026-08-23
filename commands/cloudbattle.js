const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');

const BATTLE_LINES = [
  'Their cloud briefly formed a recognizable continent.',
  'A referee had to measure the cloud with a ruler.',
  'The crowd went silent. Then someone yelled “again!”',
  'Both clouds achieved temporary sentience.',
  'The arena now smells like a suspiciously good dessert.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cloudbattle')
    .setDescription('Challenge another user to a ridiculous cloud battle')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to challenge')
        .setRequired(true))
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  async execute(interaction) {
    const challenger = interaction.user;
    const opponent = interaction.options.getUser('user');
    const challengerScore = Math.floor(Math.random() * 101);
    const opponentScore = Math.floor(Math.random() * 101);
    const line = BATTLE_LINES[Math.floor(Math.random() * BATTLE_LINES.length)];

    let result;
    if (challengerScore === opponentScore) {
      result = `🤝 **It’s a tie!** The clouds cancel each other out in a mysterious fog.`;
    } else {
      const winner = challengerScore > opponentScore ? challenger : opponent;
      result = `🏆 **${winner} wins the cloud battle!**`;
    }

    await interaction.reply(
      `☁️ **CLOUD BATTLE** ☁️\n` +
      `${challenger}: **${challengerScore}/100**\n` +
      `${opponent}: **${opponentScore}/100**\n\n` +
      `${result}\n_${line}_`
    );
  }
};