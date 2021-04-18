const Discord = require('discord.js')
const client = new Discord.Client()
module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message, args) {
  message.channel.send(`meu ping é ${Math.round(message.client.ws.ping)}ms`);
  },
};