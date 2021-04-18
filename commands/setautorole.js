const Discord = require('discord.js');
const mongoose = require('mongoose');
const cluster = mongoose.connection;
const db = cluster.collection('servidores');

module.exports = {
  name: 'setautorole',
  description: 'setar roles para o membro receber quando entrar',
  execute(message, args) {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
          return message.channel.send(`${message.author} você não tem a permissão gerenciar roles!`)
        }
        
    db.findOne({ _id: message.guild.id }, (err, res) => {
      if (err) throw console.log(err);
      if (res) {
        let cargo = message.mentions.roles.first();
        
        if(!cargo) {
          return message.channel.send(`${message.author} mencione um cargo para adicionar á membros`)
        } else {
        db.updateOne({_id: message.guild.id}, {$set: {autorole: 'ativado', roleJoin: cargo.id}});
        
        message.channel.send(`o cargo ${cargo} agora será dado á um membro quando entrar. lembre se de o cargo do bot está acima do cargo que quer dar aos membros`)
        }
      }
    })
  }
};