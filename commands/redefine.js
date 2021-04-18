const Discord = require('discord.js');
const mongoose = require('mongoose');
const cluster = mongoose.connection;
const db = cluster.collection('servidores');

module.exports = {
  name: 'redefine',
  description: 'redefinir os modulos',
  execute(message, args) {
    if (!message.member.hasPermission('MANAGER_SERVER', 'ADMINISTRATOR')) {
      return message.channel.send(`${message.author} você não tem a permissão gerenciar servidor, ou você não é um administrador!`)
    }

    if (!args[0]) {
      return message.channel.send(`${message.author} selecione um módulo para redefini-lo, para ver os modulos use &modules`)
    }
    if(args[0] != 'autorole' || args[0] != 'memberJoin') {
      const embed = new Discord.MessageEmbed()
      .setColor('#00F953')
      .setDescription('Esses são os módulos disponíveis para você desativar:')
      .addFields({name:'autorole', value: 'o membro recebe um cargo quando entra no servidor'}, {name: 'memberJoin', value: 'É mandado uma mensagem de boas vindas para o membro, no canal setado pelo usuário'})
      return message.channel.send(embed)
    }
    if (args[0] === 'autorole') {
      db.updateOne({ _id: message.guild.id }, { $set: { autorole: 'desativado', roleJoin: undefined } });
    }
    if (args[0] === 'memberJoin') {
      db.updateOne({ _id: message.guild.id }, { $set: { memberJoin: 'desativado', channelJoin: undefined } })
    }

    message.channel.send('o modulo que você selecionou foi desativado com sucesso, para reativa-lo use &set`[nome do modulo]`')
  }
}