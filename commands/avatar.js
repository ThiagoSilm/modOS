const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'pegar o url do avatar',
  execute(message) {
    if (message.channel.type === "dm") return;
    if (!message.mentions.users.size) {
      let embed = new Discord.MessageEmbed()
      .setDescription(`**${message.author.username} seu [avatar](${message.author.displayAvatarURL({ dynamic: true })}) é esse**`)
      .setImage(message.author.displayAvatarURL({ dynamic: true }))
      return message.channel.send(embed);
    }

    const avatarList = message.mentions.users.map(user => {
      let embed = new Discord.MessageEmbed()
      .setDescription(`seu avatar ${user.username}`)
      .setImage(user.displayAvatarURL({ dynamic: true }))
      return embed 
    });

    message.channel.send(avatarList);
  },
};