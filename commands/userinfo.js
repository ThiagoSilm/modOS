const Discord = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'ver informações',
  execute(message, args) {
    if (message.channel.type === "dm") return;
    
    let status = {
      online: '<:online:791732865712521236> | Online',
      idle: '<:ausente:791732907168235541> | Ausente',
      dnd: '<:dnd:791732885493252096> | Não pertubar',
      offline: '<:offline:791732843184259102> | Offine'
    }
    
    var usuario = message.mentions.users.first() || message.client.users.cache.find(user => user.id === args[0])
    
    if(!usuario) {
      usuario = message.author
    }
    
    function botUser(m) {
      if(m === true) {
        return 'Sim'
      }
      if(m === false) {
        return 'Não'
      }
    }
    
    function formatDate(template, date) {
      var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
      date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
      return date.toISOString().split(/[-:.TZ]/).reduce(function(template, item, i) {
        return template.split(specs[i]).join(item)
      }, template)
    }
    
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addFields( {name: 'Tag', value: usuario.tag}, {name: 'ID', value: usuario.id}, {name: '<:bot:791729928823373824> | Bot', value: botUser(usuario.bot)}, {name: 'Conta criada em:', value: formatDate('Dia DD Mês MM Ano YYYY, às HH:mm:ss', usuario.createdAt)}, {name: 'Status', value: status[usuario.presence.status ]})
      .setThumbnail(usuario.avatarURL({dynamic: true}))
    message.channel.send(embed);
    
  },
}