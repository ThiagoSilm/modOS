const Discord = require('discord.js')
module.exports = {
  name: 'invite',
  description: 'invite do bot',
  execute(message, args) {
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('links', 'https://media1.tenor.com/images/4b541b0a3dd2c87fca0af0464d402055/tenor.gif?itemid=18239800')
    .setDescription('[Vote](https://top.gg/bot/670161118542692352)\n[Server Suporte](https://discord.gg/TVyvZyJ)\n[Invite](https://discord.com/api/oauth2/authorize?client_id=670161118542692352&permissions=8&scope=bot)')
    message.channel.send(embed);
  },
};