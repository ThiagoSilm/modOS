const Discord = require('discord.js');
const mongoose = require('mongoose');
const cluster = mongoose.connection;
const db = cluster.collection('servidores');

module.exports = {
  name: 'setmemberjoin',
  description: 'setar um canal para mandar a mensagem de boas vindas',
  execute(message, args) {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
      message.channel.send(`${message.author} você não tem a permissão gerenciar canais!`)
    }

    db.findOne({ _id: message.guild.id }, (err, res) => {
      if (err) throw console.log(err);
      if (res) {
        let canal = message.mentions.channels.first();

        if (!canal) {
          return message.channel.send(`${message.author} mencione um canal para enviar á mensagem de boas vindas`)
        } else {
          db.updateOne({ _id: message.guild.id }, { $set: { memberJoin: 'ativado', channelJoin: canal.id} });

          message.channel.send(`o canal ${canal} foi setado para enviar mensagem quando um membro entrar`)
        }
      }
    })
  }
};