const Discord = require('discord.js');
module.exports = {
  name: 'roleinfo',
  description: 'informações de um cargo',
  execute(message, args){
    const cargo = message.mentions.roles.first();
    if (message.channel.type === "dm") return;
    
    if(!cargo)return message.channel.send(`<a:checkno:738832502155903067>| ${message.author} **você não definiu o cargo que quer ver as informações**`); 
    const embed = new Discord.MessageEmbed()
    .setColor(cargo.color)
    .addFields( {name: 'Id', value: `${cargo.id}`},
    {name: 'Nome', value: `${cargo.name}`},
    {name: 'Cor', value: `${cargo.hexColor}`},
    {name: 'Menção', value: '`<@&' + cargo + '>`'},
    {name: 'Posição', value: `${cargo.position}`},
    {name: 'Mencionavel', value: `${cargo.mentionable}`});
    if(cargo){
      message.channel.send(embed)
    }
  }
}