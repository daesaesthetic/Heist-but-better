const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');

const FORTUNES = [
  'You will take one too many hits today. Pace yourself. 💨',
  'A fresh coil is in your future. 🔧',
  'Someone nearby is judging your clouds. Let them. ☁️',
  'Great flavor awaits those who stay hydrated. 💧',
  'Your battery will die at the worst possible moment. Charge now. 🔋',
  'A new skin will find its way to you soon. ✨',
  'The next hit will be the best one yet. 🌬️',
  'Beware of cotton burn. Tread carefully. 🔥',
  'You will reach 1000 puffs before the week is over. 📈',
  'An unexpected cloud will turn heads today. 👀',
  'Fortune favors the fully charged. ⚡',
  'Today is a good day to customize your vape. 🎨',
  'Someone will ask you for a hit. The choice is yours. 🤔',
  'Big clouds bring big responsibility. 🌫️',
  'You will forget to charge again. This is your warning. ⚠️',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fortune')
    .setDescription('Give a random fortune to a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to fortune')
        .setRequired(true))
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];

    await interaction.reply({
      content: `🔮 Fortune for ${target}: *${fortune}*`
    });
  }
};
