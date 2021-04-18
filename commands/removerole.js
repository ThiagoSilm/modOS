const Discord = require('discord.js');

module.exports = {
  name: 'roleremove',
  description: 'adicionar cargo à um membro',
  guildOnly: true,
  execute(message, args) {
    if (message.channel.type === "dm") return;

    const cargo = message.mentions.roles.first();

    function coloRole() {
      if (!cargo) return '#fff'
    }
    const member = message.mentions.members.first() || message.guild.members.cache.find(user => user.id === args.slice(1).join(''));
    if (!message.member.hasPermission('MANAGE_ROLES')) {
      message.channel.send(`${message.author} você não tem a permissão gerenciar roles!`)
    }
    if (!cargo) {
      message.channel.send('você não definiu a role que quer adicionar a um membro.')
    }
    if (member && cargo) {
      member.roles.remove(cargo).then(message.channel.send(embed)).catch(err => {
        message.channel.send(`${message.author} o cargo que você mencionou é maior que o meu`)
      });

      const embed = new Discord.MessageEmbed()
        .setColor(coloRole())
        .setTitle('<a:checkyes:738832483076014191> Cargo removido com sucesso')
        .setDescription(`o cargo ${cargo} foi removido do usuario`);
    }


  }
}