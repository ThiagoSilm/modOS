const mongoose = require('mongoose')
const cluster = mongoose.connection;
const db = cluster.collection('usuarios');

module.exports = {
  name: 'coinflip',
  description: 'dar cara ou coroa',
  execute(message, args) {
    var coin = Math.floor(Math.random() * 20);
    var user = message.mentions.users.first();
    let dinheiro = Math.round(Math.random() * 1000);
    
    if(user){
      if(user === message.author) {
        return message.channel.send('**Você não pode jogar contra você mesmo. apenas contra o resto do mundo...**')
      }
      if(user.bot) {
        return message.channel.send(`**Um bot não poderá jogar contra você. sinto muito!**`)
      }
      if (isNaN(args[1])) {
    return message.channel.send(`**Por favor ${message.author} defina um valor a ser apostado!**`)
  }
  message.channel.send(`**${message.author} está querendo apostar ${args[1]} na moeda, ${user} você aceita?**`).then(msg => {
    msg.react('✅').then(r => {})
  
    const filter = (reaction, membro) => reaction.emoji.name === '✅' && membro.id ===  user.id;
    const collector = msg.createReactionCollector(filter);
    collector.on('collect', r2 => {
          if (coin % 3 === 0) {
            db.findOne({ _id: message.author.id }, (err, res) => {
              if (err) throw console.log(err);
              if (res) {
                db.updateOne({ _id: message.author.id }, { $set: { money: res.money + Number(args[1]) } })
                db.findOne({_id: user.id}, (err, res2) => {
                  if(err) throw console.log(err);
                  if(res2) {
                  db.updateOne({ _id: user.id }, { $set: { money: res2.money - Number(args[1]) } })
                  }
                })
                message.channel.send(` **${message.author.username} jogou a moeda e caiu no ${message.author}, e o ${user} pagou $${args[1]} reais**`);
              }
            })
          }
          else {
            db.findOne({ _id: message.author.id }, (err, res) => {
              if (err) throw console.log(err);
              if (res) {
                db.updateOne({ _id: message.author.id }, { $set: { money: res.money - Number(args[1]) } })
                db.findOne({ _id: user.id }, (err, res2) => {
                  if (err) throw console.log(err);
                  if (res2) {
                    db.updateOne({ _id: user.id }, { $set: { money: res2.money - Number(args[1]) } })
                  }
                })
                message.channel.send(` **${message.author.username} jogou a moeda e caiu no ${user}, e o ${message.author} pagou $${args[1]} reais**`);
              }
            })
          }
    });
  })
    } else {
      if (coin % 3 === 0) {
        user = '**Cara**'
        db.findOne({_id: message.author.id}, (err, res) => {
          if(err) throw console.log(err);
          if(res) {
        db.updateOne({_id: message.author.id}, {$set: {money: res.money + dinheiro}})
          message.channel.send(` ${message.author} jogou a moeda e caiu no ${user}, e ganhou $${dinheiro} reais`);
          }
        })
      }
      else {
        user = '**Coroa**'
        db.findOne({ _id: message.author.id }, (err, res) => {
          if (err) throw console.log(err);
          if (res) {
            db.updateOne({ _id: message.author.id }, { $set: { money: res.money - dinheiro} })
           message.channel.send(` ${message.author} jogou a moeda e caiu no ${user}, e perdeu $${dinheiro} reais`);
          }
        })
      }
    }
  }
}