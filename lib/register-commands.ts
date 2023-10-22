import type { Client } from 'discord.js';
import commands from './commands';
import logger from './logger';

export default async function registerCommands(client: Client) {
  const payload = commands.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
  }));

  const guilds = await client.guilds.fetch();
  logger.debug('Will register commands to the ff. servers:');
  logger.debug(guilds.map((guild) => `\t${guild.name} (${guild.id})`).join('\n'));

  await client.application?.commands.set(payload);

  logger.debug('Successfully registered the ff. commands:');
  logger.debug(payload.map((command) => `\t/${command.name} - ${command.description ?? 'No description'}`).join('\n'));
}
