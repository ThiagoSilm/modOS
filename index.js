const fs = require('fs');
const axios = require('axios');
const Discord = require('discord.js'); //blibioteca do discord
const ms = require('ms');
//tempo para comandos
const mongoose = require('mongoose')

const { token, ownerId } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
} //filtro de .js 


const cooldowns = new Discord.Collection();
//isso não é necessario, mas é para os cooldowns

client.mongoose = require('./database/mongodb')
client.mongoose.init()
const cluster = mongoose.connection;
const db = cluster.collection('servidores');
const db2 = cluster.collection('usuarios');
//database

const ytdl = require("discord-ytdl-core");
//comandos de musicas

client.once('ready', () => {
  console.log(`${client.user.tag} ligado com sucesso`);
});
  client.on('ready', () => {
    let status = [

      { name: 'Bot em desenvolvimento tipo cyberpunk 2077', type: 'LISTENING' },
     { name: 'use &help', type: 'STREAMING' },
      { name: 'tentando ser revolucionário', type: 'PLAYING'},
      {name: 'Server de suporte: https://discord.gg/aZdSCktyp',type: 'WATHCHING'},
      {name: `estou em ${client.guilds.cache.size} servers`,type: 'STREAMING'}
    ]

    function setStatus() {
      let randomStatus = status[Math.floor(Math.random() * status.length)]
      client.user.setPresence({ activity: randomStatus })
    }
    setStatus();
    setInterval(() => setStatus(), 120000);
   }); //status do bot com tempo

client.on('message', async (message) => {
   db.findOne({_id: message.guild.id}, (err,res) => {
      if(err) throw console.log(err)
      if(res) {
      let prefixo = res.prefix;
    if (!message.content.startsWith(prefixo) || message.author.bot) return;
    const args = message.content.slice(prefixo.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send(`${message.author} espere ${timeLeft.toFixed(1)} para segundos para usar outro comando`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    
    if (!client.commands.has(command)) return;
    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('ocorreu um erro ao executar esse comando');
    }
      }
   })
  }); //para deixar os comandos com o meu prefixo &
  
client.on("message", async message => {
if(message.channel.type === "dm") return;
if(message.author.bot) return;
db.findOne({_id: message.guild.id}, (err, res) => {
  if(err) throw console.log(err);
  if(res) {
    if (message.content.startsWith(client.user)) {
      message.channel.send('meu prefixo é ' + '`' + res.prefix + '`');
  }
  }
})
}); //mensagem de menção do bot

client.on('guildCreate', (guild) => {
  db.findOne({_id: guild.id}, (err, res) => {
    if(err) throw console.log(err);
    if(!res) {
      db.insertOne({_id: guild.id, prefix: '&', autorole: 'desativado', memberJoin: 'desativado'})
    }
  })
});

client.on('guildMemberAdd', (member) => {
  db.findOne({_id: member.guild.id}, (err, res) => {
    if(err) throw console.log(err);
    if(res) {
      if(res.roleJoin) {
      member.roles.add(res.roleJoin).catch(err => console.log(err))
      if(res.channelJoin) {
        let canal = client.channels.cache.get(res.channelJoin);
        canal.send(`${member} seja bem vindo ao servidor ${member.guild.name} siga todas as regras para não ser punido!`)
      }
      }
    }
  })
});

/*const { exec } = require('child_process');

exec("curl ifconfig.me/ip", (err, stdout) => {
  console.log(stdout)
})*/ //ver o ip da máquina

client.login(token); //para ele logar e entrar.