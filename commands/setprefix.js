const Discord = require('discord.js')
const mongoose = require('mongoose');
const cluster = mongoose.connection;
const db = cluster.collection('servidores');
module.exports = {
  name: 'setprefix',
  description: 'mudar o prefixo do bot',
  execute(message, args) {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('<a:checkno:738832502155903067>|Você não tem a permissão ``Gerenciar Servidor``');
    
    db.updateOne({_id: message.guild.id}, {$set: {prefix: args[0]}}, (err, res) => {
      if(err) throw console.log(err);
      if(res) {
        let embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription('Prefixo setado para ' + '`' + args[0] + '`')
        message.channel.send(embed);
      }
    })
  },
};