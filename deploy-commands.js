const { REST, Routes } = require('discord.js');
const fs = require('fs');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

if (!token || !clientId) {
  console.error('Missing DISCORD_TOKEN or DISCORD_CLIENT_ID environment variables');
  process.exit(1);
}

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`Registering ${commands.length} slash command(s) globally...`);

    // Register globally so user-installed app works in any server
    const data = await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log(`Successfully registered ${data.length} global command(s).`);
    console.log('Note: Global commands can take up to 1 hour to appear everywhere.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
