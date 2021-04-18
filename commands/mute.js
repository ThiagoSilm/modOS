const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'mute',
  description: 'mutar membros',
  guildOnly: true,
  execute(message, args) {
    let reason = args[2]
    let member = message.mentions.members.first();
    let role = message.guild.roles.cache.find(role => role.name === 'muted');
    
    if (message.channel.type === "dm") return;
    
    if(!message.member.hasPermission('ADMINISTRATOR', 'KICK_MEMBERS')) {
      return message.channel.send(`${message.author} você não tem a permissão administrador ou expulsar membros`);
    } 
    if(!member) {
      return message.channel.send(`${message.author} mencione o membro que quer mutar`);
    }
  if(role === undefined) {
    message.guild.roles.create({
      data: {
      name: 'muted',
      color: '#616567',
      },
    reason: 'preciso para mute'});
    message.guild.channels.cache.forEach(channel => {
 channel.updateOverwrite(role, {
SEND_MESSAGES: false,
ADD_REACTIONS: false,
  })
       }
);
}

if(member.hasPermission('ADMINISTRATOR')) {
  return message.channel.send(`não posso mutar o ${member} ele(a) é admin/mod`);
} else {
  member.roles.add(role);
  if (member.roles.cache.some(role => role.name === 'muted')) {
  return message.channel.send('**O usuario já foi mutado!**');
  }
  let tempo = ms(args[1]);
  if(!tempo) {
    return message.channel.send(`o ${member} ficará mutado para sempre, caso não tenha adicionado o tempo`)
  } else {
  let embed = new Discord.MessageEmbed()
    .setColor('#25c059')
    .setDescription(`${member.user.tag} foi mutado`);
    message.channel.send(embed);
  setTimeout(() => message.channel.send(`enfim o ${member} pode falar novamente`),tempo);
  setTimeout(() => member.roles.remove(role),tempo);
  }
}
     }
  }