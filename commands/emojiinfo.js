const Discord = require('discord.js');
module.exports = {
  name: 'emojiinfo',
  description: 'ver o emoji em png',
  execute(message, args){
    if (message.channel.type === "dm") return;
    const emoji = message.guild.emojis.cache.find(emoji => emoji.name === args.join(''))
    if (emoji) {
     const embed = new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setDescription(`nome do emoji: ${args.join('')}\nid do emoji: ${emoji.id}`)
      .setThumbnail(emoji.url);
      message.channel.send(embed);
    }
    else {
      message.channel.send('<a:checkno:738832502155903067>|tente assim: &emoji ``nome do emoji``');
    }
  }

};