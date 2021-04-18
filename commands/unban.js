const Discord = require('discord.js');
module.exports = {
  name: 'unban',
  description: 'desbanir membros',
  guildOnly: true,
  execute(message,args){
    if (message.channel.type === "dm") return;
    const embed = new Discord.MessageEmbed()
    .setColor('#25c059')
    .setDescription('membro desbanido com sucesso');
    if(!message.member.hasPermission('BAN_MEMBERS', 'ADMINISTRATOR')) return message.channel.send('você não tem a permissão ``banir membros`` ou ``administrador``');
    
    const member = args[0];

        if (!member) {
             return message.channel.send('coloque o id para desbanir o membro')
        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member)
            })
            message.delete()
            message.channel.send(embed);
        } catch (e) {
            return message.channel.send('erro no comando')
        }
}
}