const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: 'kick',
    description: 'expulsar membros',
    execute(message, args){
      if (!message.guild) return;
      if(message.member.hasPermission('KICK_MEMBERS')){
        const user = message.mentions.users.first() || message.guild.members.cache.find(user => user.id === args.slice(0).join(''));
        // If we have a user mentioned
        if (user) {
          // Now we get the member from the user
          const member = message.guild.member(user);
          // If the member is in the guild
          if (member) {
            /**
             * Kick the member
             * Make sure you run this on a member, not a user!
             * There are big differences between a user and a member
             */
            member
              .kick()
              .then(() => {
                // We let the message author know we were able to kick the person
                const embed = new Discord.MessageEmbed()
                .setColor('#25c059')
                .setDescription(`${user} expulso(a) com sucesso`);
                message.channel.send(embed);
              })
              .catch(err => {
                // An error happened
                // This is generally due to the bot not being able to kick the member,
                // either due to missing permissions or role hierarchy
                message.channel.send('Não consegui expulsar esse membro por ele ter a permissão de admin/mod');
                // Log the error
                console.error(err);
              });
          } else {
            // The mentioned user isn't in this guild
            message.channel.send("esse membro não está no server");
          }
          // Otherwise, if no user was mentioned
       }else{
          message.channel.send(`não consegui expulsar o membro`);
        }
      } else {
        message.channel.send('você não tem a permissão ``expulsar membros``');
      }
    }
    }