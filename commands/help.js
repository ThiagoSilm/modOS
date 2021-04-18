const Discord = require('discord.js');
module.exports = {
    name: 'help',
    guildOnly: true,
    description: 'dar os comandos',
    execute(message, args) {
      if (message.channel.type === "dm") return;
      let embed = new Discord.MessageEmbed()
        .setColor('#FC0487')
        .setAuthor('Ajuda do Okumura')
        .setDescription(`[invite](https://discord.com/api/oauth2/authorize?client_id=670161118542692352&permissions=8&scope=bot)`)
        .addFields({name: 'moderação', value: '`&purge, &slowmode, &kick, &ban, &unban, &roleadd, &roleremove, &roleinfo, &rolecolor, &lock, &unlock, &setautorole, &setmemberjoin`'}, {name: 'entretenimento', value: '`&kiss, &hug, &slap`'}, {name: 'utilidade', value: '`&say, &emoji, &invite, &sendm, &setprefix, &modules, &userinfo, &searchbot, &redefine`'}, {name: 'economia', value: '`&daily, &coins, &pay`'}, { name: 'musica', value: '`&play, &stop, &queue, &join, &leave, &skip`'
        })
        .setThumbnail('https://cdn.discordapp.com/attachments/713864690484379691/739274535840383016/images.jpg');
        message.channel.send(embed)
      }
}
  