import { Interaction } from 'discord.js';
import client from './lib/client';
import commands from './lib/commands';
import logger from './lib/logger';
import registerCommands from './lib/register-commands';

logger.info('Starting...');

client.on('ready', () => {
  logger.info(`Bot Name: ${client.user?.tag}`);
  logger.info(`Bot ID: ${client.user?.id}`);
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand() && !interaction.isContextMenuCommand()) return;

  const command = commands.find(({ name }) => name === interaction.commandName);

  if (!command) return;

  try {
    await command(client, interaction);
  } catch (error) {
    logger.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

await client.login(process.env.DISCORD_TOKEN)
  .catch((error) => {
    logger.error('Discord login failed!', error);
    process.exit(1);
  });
await registerCommands(client);

logger.info('Bot is ready!');
