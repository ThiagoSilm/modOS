const Discord = require('discord.js');
const BrawlStars = require("brawlstars.js")
const mongoose = require('mongoose');
const cluster = mongoose.connection;
const db = cluster.collection('usuarios');
const { discloudapi } = require('../config.json')
const client = new BrawlStars.Client(discloudapi)

module.exports = {
  name: 'profile',
  description: 'ver o perfil do brawl stars',
  execute(message, args) {
    db.findOne({_id: massage.author.id}, (res, err) => {
      if(err) console.log(err)
      if(res) {
        const player = client.getPlayer(res.profile.tag).then(response => {
          const embed1 = new Discord.MessageEmbed()
            .setColor(response.nameColor)
            .setTitle(`${response.name} | ${response.tag}`)
            .addFields({ name: 'brawlers', value: response.brawlers }, { name: 'tag', value: response.tag }, { name: 'level', value: response.expLevel }, { name: 'troféus', value: response.trophies }, { name: 'clube', value: response.club })
          message.channel.send(embed1).then(msg => {
            const embed2 = new Discord.MessageEmbed()
              .setColor('#277ECD')
              .setDescription('<:bluple_check:822538550796222484> sua conta foi salva, não há mais como mudar!')
            setTimeout(function() {
              msg.edit(embed2)
            }, 9000);
            db.updateOne({ _id: message.author.id }, { $set: { profile: { tag: args[0] } } })
          })
        }).catch(Error => {
          return message.channel.send('Não consegui achar a sua conta, tente novamente')
        })
      }
    })
  }
}