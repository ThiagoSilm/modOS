const Discord = require('discord.js');
const axios = require('axios')

module.exports = {
  name: 'slap',
  decription: 'dar um tapa em um usuarios',
  execute(message, args) {
    let member = message.mentions.users.first();
    if (!member) {
      return message.channel.send('**Mencione alguém para que possa bater até o talo no usuário**')
    }
    if (member.id === message.author.id) {
      return message.channel.send('**Não se bata. por favor...**')
    }
    axios.get('https://nekos.life/api/v2/img/slap').then(function(response) {
      let embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} deu um tapa no(a) ${member.username}`)
        .setColor('RANDOM')
        .setImage(response.data.url)
      message.channel.send(embed)
    })
  }
}