const Discord = require('discord.js');
const mongoose = require('mongoose')
const cluster = mongoose.connection;
const db = cluster.collection('usuarios')

module.exports = {
  name: "daily",
  description: "Receive a daily award of money",
  execute (message, args) {
    db.findOne({_id: message.author.id}, (err, res) => {
      if(err) throw console.log(err);
      if(!res) {
        let daily = Math.round(Math.random() * 5000)
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`<a:universo:741416542616551497> Parabéns ${message.author.tag} <a:universo:741416542616551497>`)
          .setDescription(`<a:glitchCat:725008440837144628> Você recebeu ||${daily}|| reais`)
        message.channel.send(embed)
        db.insertOne({ _id: message.author.id, money: daily, daily: Date.now()})
      }
      else if(res) {
        let lastRedeem = res.daily;
        if (Date.now() - parseInt(lastRedeem) < 86400000) {
          return message.channel.send(`Você já recebeu. volte amanhã para receber novamente`);
        } else {
          let daily = Math.round(Math.random() * 5000)
          let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`<a:universo:741416542616551497> Parabéns ${message.author.tag} <a:universo:741416542616551497>`)
          .setDescription(`<a:glitchCat:725008440837144628> Você recebeu ||$${daily}|| reais `)
        message.channel.send(embed)
        db.updateOne({_id: message.author.id}, {$set: {money: res.money + daily, daily: Date.now()}})
        }
      }
    })
  }
}