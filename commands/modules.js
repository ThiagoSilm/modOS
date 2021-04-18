const Discord = require('discord.js');
const mongoose = require('mongoose');
const cluster = mongoose.connection;
const db = cluster.collection('servidores');

module.exports = {
  name: 'modules',
  description: 'visualizar modulos ativados ou desativados',
  execute(message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
     return message.channel.send(`${message.author} você não tem a permissão ADMINISTRADOR`)
    }
    
    db.findOne({_id: message.guild.id }, (err, res) => {
      if (err) throw console.log(err);
      if (res) {
        function modulos(m) {
          if(m === 'ativado') {
            return 'ativado'
          }
          if(m === 'desativado') {
            return '<a:off:738832136777367652>'
          }
        }
        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Modulos')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setFooter('para ativar modulos use &set[nome do modulo]')
        .setDescription(`Autorole: ${modulos(res.autorole)}\nMemberJoin: ${modulos(res.memberJoin)}`)
          message.channel.send(embed)
      }
    })
  }
}