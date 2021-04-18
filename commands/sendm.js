module.exports = {
  name: 'sendm',
  description: 'enviar mensagens para usuarios pelo bot',
  guildOnly: true,
  execute(message, args) {
    if (message.channel.type === "dm") return;
    const msg = args.slice(1).join(" ");
    if (!message.mentions.members.first()) {
      return message.channel.send('**Você não mencionou nada, como vou enviar mensagem para o nada?**')
    }
    if (!msg) {
      message.channel.send('**Você não enviou uma mensagem, escreva algo para esse usuario**')
    }else {
      let dm = message.client.users.cache.get(message.mentions.members.first().id);
      if (!dm) {
        return message.channel.send('**Você precisa mencionar um mebro para mandar uma mensagem para ele!**')
      } else {
        message.delete().catch(O_o => {});
        dm.send(`**${message.author.tag}** do servidor **${message.guild.name}** enviou: ${msg}`);
        message.channel.send(`sua mensagem foi enviada para: ${message.mentions.members.first()}`)
      }
    }
  }
}