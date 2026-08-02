const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hit')
    .setDescription('Take a hit from your vape'),

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

    if (user.battery <= 0) {
      return interaction.reply('🔋 Your vape is dead. Use /charge');
    }

    user.puffs += 1;
    user.battery -= 1;

    fs.writeFileSync('./data/users.json', JSON.stringify(data, null, 2));

    await interaction.reply({
      content: `💨 hitting the ${user.name}...\n\nPuffs: ${user.puffs}\nBattery: ${user.battery}/50`
    });
  }
};