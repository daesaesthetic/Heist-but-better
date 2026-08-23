const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');

const FLAVORS = [
  ['Blue Static', 'tastes like a lightning bolt wearing sunglasses. ⚡'],
  ['Midnight Cereal', 'somehow nostalgic, slightly illegal, and best served at 2 AM. 🥣'],
  ['Mango Protocol', 'your taste buds have been granted executive clearance. 🥭'],
  ['Cosmic Pickle', 'brave, confusing, and impossible to explain to your friends. 🥒'],
  ['Neon Melon', 'a fruit-forward cloud with suspiciously good stage presence. 🍈'],
  ['Velvet Cola', 'smooth enough to make the bubbles feel expensive. 🥤'],
  ['Ghost Berry', 'there is berry flavor here, but it refuses to testify. 👻'],
  ['Cinnamon Satellite', 'warm on arrival, orbiting your palate by departure. 🛰️'],
  ['Peach Reboot', 'a soft reset for your entire personality. 🍑'],
  ['Electric Lychee', 'delicate fruit energy with a tiny lightning problem. 🔌'],
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('flavorroulette')
    .setDescription('Spin the wheel for a surprising vape flavor')
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  async execute(interaction) {
    const [name, verdict] = FLAVORS[Math.floor(Math.random() * FLAVORS.length)];
    await interaction.reply(`🎰 **Flavor Roulette:** ${name}\n${verdict}`);
  }
};