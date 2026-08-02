const { REST, Routes } = require('discord.js');
const fs = require('fs');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID; // optional: omit to register globally

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
    console.log(`Registering ${commands.length} slash command(s)...`);

    let data;
    if (guildId) {
      data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
      console.log(`Registered ${data.length} guild command(s) to guild ${guildId}.`);
    } else {
      data = await rest.put(Routes.applicationCommands(clientId), { body: commands });
      console.log(`Registered ${data.length} global command(s).`);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
