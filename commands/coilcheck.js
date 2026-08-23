const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');

const DIAGNOSES = [
  ['COIL IS FEELING ICONIC', 'Flavor output: theatrical. Replace nothing. You are witnessing greatness. 👑'],
  ['MINOR CRUNCH DETECTED', 'Your coil has been through a lot and would like a spa day. 🛁'],
  ['CLOUD ENGINE: OVERCONFIDENT', 'The device thinks it can fill the room. It may be right. 🌫️'],
  ['FLAVOR SIGNAL IS HAUNTED', 'A ghost note is present. It tastes like unfinished business. 👻'],
  ['BATTERY AURA: QUESTIONABLE', 'Charge soon, preferably before the dramatic final puff. 🔋'],
  ['SETUP PASSES THE VIBE AUDIT', 'No notes. The coil is moisturized, focused, and ready. ✅'],
  ['EMERGENCY DRIP DETECTED', 'The coil requests attention and possibly a tiny ceremonial dance. 💧'],
  ['COIL HAS ENTERED ITS VILLAIN ARC', 'Expect bold flavor and one unnecessary monologue. 🦹'],
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coilcheck')
    .setDescription('Get a dramatic diagnosis for your vape')
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  async execute(interaction) {
    const [diagnosis, details] = DIAGNOSES[Math.floor(Math.random() * DIAGNOSES.length)];
    await interaction.reply(`🩺 **COIL CHECK COMPLETE**\n**${diagnosis}**\n${details}`);
  }
};