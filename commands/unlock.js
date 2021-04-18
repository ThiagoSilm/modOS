module.exports = {
  name: 'unlock',
  description: 'abrir um canal',
  execute(message, args) {
    if (message.channel.type === 'dm') return;
    if(!message.member.hasPermission('MANAGE_CHANNELS'))return message.channel.send(`${message.author} você não tem a permissão gerenciar canais`);
    
    const canal = message.channel.id;
    const role = message.guild.roles.cache.find(role => role.name === '@everyone')

    const channel = message.guild.channels.cache.get(canal)
    channel.updateOverwrite(role, {
      SEND_MESSAGES: true,
      ADD_REACTIONS: true,
    });
    message.channel.send(`<a:checkyes:738832483076014191>|O canal <#${canal}> foi aberto`)
  }
}