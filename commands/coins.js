const Discord = require('discord.js');
const mongoose = require('mongoose')
const cluster = mongoose.connection;
const db = cluster.collection('usuarios')

module.exports = {
  name: 'coins',
  description: 'ver a quanto tem',
  execute(message, args) {
    let membro = message.mentions.users.first() || message.author;
    
    db.findOne({_id: membro.id}, (err, res) => {
      if(err) throw console.log(err)
      if(!res) {
        db.insertOne({_id: membro.id, money: 0})
        return message.channel.send('você não possui nada')
      }
      if(res) {
        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(membro.tag, membro.displayAvatarURL({dynamic: true}))
        .setDescription(`${membro} você possui $${res.money} reais`)
        message.channel.send(embed)
      }
    })
  }
}