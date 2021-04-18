const Discord = require('discord.js');
const axios = require('axios')

module.exports = {
  name: 'kiss',
  decription: 'beijar usuarios',
  execute(message, args) {
    let member = message.mentions.users.first();
    if(!member) {
      return message.channel.send('**Mencione alguém para que possa beijar o usuário**')
    }
    if(member.id === message.author.id) {
      return message.channel.send('**Você não pode se beijar :/**')
    }
    axios.get('https://nekos.life/api/kiss').then(function(response) {
      let embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} deu um beijo no(a) ${member.username}`)
        .setColor('RANDOM')
        .setImage(response.data.url)
        message.channel.send(embed)
    })
  }
}