import { Client, CommandInteraction } from 'discord.js';

export default async function ping(client: Client, interaction: CommandInteraction) {
  await interaction.reply('Pong!');
}

ping.description = 'Ping!';
