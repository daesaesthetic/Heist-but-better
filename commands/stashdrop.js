const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');

const DROPS = [
  ['a forbidden mango cartridge', 'It hums when nobody is looking. 🥭'],
  ['a velvet carrying case', 'It contains exactly one mysterious button. 🎒'],
  ['a bottle of premium cloud seasoning', 'Use sparingly. Or don’t. The label is unclear. 🧂'],
  ['a chrome drip tip from the future', 'It remembers every cloud you have ever made. ✨'],
  ['a coupon for one legendary flavor', 'The expiration date is written in hieroglyphics. 🎟️'],
  ['a tiny emergency charger', 'It has enough power for one extremely dramatic hit. 🔋'],
  ['a suspiciously warm coil', 'It insists that everything is fine. 🔥'],
  ['a holographic vape sticker', 'It changes design whenever you blink. 🌈'],
  ['a cloud-shaped keychain', 'It appears to be judging your current setup. ☁️'],
  ['a note from your future self', 'It only says: “Charge it first.” 📝'],
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stashdrop')
    .setDescription('Discover a random item from the vape stash')
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall])
    .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel]),

  async execute(interaction) {
    const [item, description] = DROPS[Math.floor(Math.random() * DROPS.length)];
    await interaction.reply(`📦 **Stash Drop!**\nYou found **${item}**.\n${description}`);
  }
};