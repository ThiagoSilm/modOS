const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'ban',
    description: 'banir membros',
    execute(message, args) {
      if (message.channel.type === "dm") return;
      if (!message.guild) return;
      if (message.member.hasPermission('BAN_MEMBERS')){
        const user = message.mentions.users.first() || message.guild.members.cache.find(user => user.id === args.slice(0).join(' '));
        // If we have a user mentioned
        if (user) {
          // Now we get the member from the user
          const member = message.guild.member(user);
          // If the member is in the guild
          if (member) {
            /**
             * Ban the member
             * Make sure you run this on a member, not a user!
             * There are big differences between a user and a member
             * Read more about what ban options there are over at
             * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
             */
            member
              .ban({
                reason: args.slice(1).join(' ')|| 'motivo não colocado!',
              })
              .then(() => {
                // We let the message author know we were able to ban the person
                const embed = new Discord.MessageEmbed()
               .setColor('#25c059')
               .setDescription(`${user.tag} banido(a) com sucesso`);
                message.channel.send(embed);
              })
              .catch(err => {
                // An error happened
                // This is generally due to the bot not being able to ban the member,
                // either due to missing permissions or role hierarchy
                message.channel.send('Não consegui banir esse membro pois ele tem a permissão admin/mod');
                // Log the error
                console.error(err);
              });
          } else {
            // The mentioned user isn't in this guild
            messageschannel.send("esse membro não está no server");
          }
        } else {
          // Otherwise, if no user was mentioned
          message.channel.send("Você precisa mencionar o usuario para bani-lo");
        }
      }
      else {
        message.channel.send(`${message.author} você não tem a permissão ``banir membros```);
      }
    }
}