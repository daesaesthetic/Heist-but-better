# Vape Discord Bot

A Discord bot with vape-themed slash commands built with discord.js v14.

## Commands

- `/hit` — Take a puff from your vape. Tracks puff count and drains battery.
- `/customize` — Set a custom name and skin for your vape.

## Stack

- **Runtime:** Node.js
- **Library:** discord.js v14
- **Data:** JSON file (`data/users.json`)

## Running the bot

The bot starts with:

```
node index.js
```

## Registering slash commands

Before users can see the slash commands in Discord, run:

```
node deploy-commands.js
```

This requires `DISCORD_TOKEN`, `DISCORD_CLIENT_ID`, and optionally `DISCORD_GUILD_ID` (for faster guild-scoped registration during development).

## Required secrets

| Secret | Description |
|---|---|
| `DISCORD_TOKEN` | Bot token from the Discord Developer Portal |
| `DISCORD_CLIENT_ID` | Application (client) ID from the Discord Developer Portal |
| `DISCORD_GUILD_ID` | (Optional) Guild ID for guild-scoped command registration |

## User preferences

- Keep the existing project structure.
