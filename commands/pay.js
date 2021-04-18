const Discord = require('discord.js');
const mongoose = require('mongoose')
const cluster = mongoose.connection;
const db = cluster.collection('usuarios')

module.exports = {
  name: 'pay',
  description: 'pagar um usuário',
  execute(message, args) {
    db.findOne({_id: message.author.id}, (err, res) => {
      if(err) throw console.log(err)
      if(!res) {
        db.insertOne({_id: message.author.id, money: 0})
        return message.channel.send('você possui `0`. não poderá pagar ninguém')
      }
      if(res) {
        let membro = message.mentions.users.first()
        if(!membro) {
          return message.channel.send('Mencione alguém para poder pagar-lo')
        } else {
          if(membro === message.author) {
            return message.channel.send('você não pode se pagar!')
          }
          if(!args[1]) {
            return message.channel.send('defina um valor!')
          }
          if(isNaN(args[1])) {
            return message.channel.send(`${args[1]} não é um numero!`)
          }
          db.findOne({_id: membro.id}, (err, res2) => {
            if(err) throw console.log(err)
            if(!res) {
              db.insertOne({_id: membro.id, money: args[1]
          })
            }
            if(res2) {
              db.updateOne({_id: membro.id}, {$set: {
            money: res2.money + Number(args[1])
          }})
            }
            db.updateOne({_id: message.author.id}, {$set: {money: res.money - args[1]}})
            message.channel.send(`${message.author} você acaba de pagar ${args[1]} reais para o ${membro}`)
          })
        }
      }
    })
  }
}