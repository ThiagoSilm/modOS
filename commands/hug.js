const Discord = require('discord.js');
const axios = require('axios')

module.exports = {
  name: 'hug',
  decription: 'abraçar usuarios',
  execute(message, args) {
    let member = message.mentions.users.first();
    if (!member) {
      return message.channel.send('**Mencione alguém para que possa abraça-lo**')
    }
    if (member.id === message.author.id) {
      return message.channel.send('**Você até pode se abraçar, mas seria estranho...**')
    }
    axios.get('https://nekos.life/api/hug').then(function(response) {
      let embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} abraçou o(a) ${member.username}`)
        .setColor('RANDOM')
        .setImage(response.data.url)
      message.channel.send(embed)
    })
  }
}