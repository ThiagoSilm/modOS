const Discord = require('discord.js');
module.exports = {
  name: 'rolecolor',
  description: 'adicionar cor',
  execute(message, args){
   if (message.channel.type === "dm") return;
    const cargo = message.mentions.roles.first();
    if(!cargo)return message.channel.send(`<a:checkno:738832502155903067>|${message.author} você não definiu o cargo que quer definir a cor!`);
    const argumento = args.slice(1).join('');
  const cor = cargo.setColor(argumento);
  const embed = new Discord.MessageEmbed()
  .setDescription(`a cor ${argumento} foi colocada no cargo ${cargo.name}`)
  .setColor(cargo.color);
  
  message.channel.send(embed)
  }
}