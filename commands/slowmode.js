const Discord = require('discord.js');
module.exports = {
    name: 'slowmode',
    description: 'canal com slowmode',
    guildOnly: true,
execute(message, args){
  if (message.channel.type === "dm") return;
  if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channe.send(`${message.author} você não tem a permissão ``gerenciar canais```)
  try {
    if (!args[0] || args[0] > 21600) return message.channel.send("Insira Um Tempo Em Segundos, Máximo: 21600 Segundos")
    message.channel.setRateLimitPerUser(args[0])
    var embed = new Discord.MessageEmbed()
      .setColor("#0405fd")
      .setAuthor(`modo lento`, message.author.displayAvatarURL)
      .setDescription(`**Slowmode Alterado Para **: ${args.join(' ')} Segundos`)
    message.channel.send({ embed });
  } catch (err) {
    message.channel.send("Erro Ao Colocar " + args[0] + " No Modo Lento.")
  }
}
}