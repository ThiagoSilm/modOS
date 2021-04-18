const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'searchbot',
  description: 'pesquisar um bot',
  execute(message, args) {
    function SetError(i) {
      if(i === undefined) {
        return '0'
      } else {
        return i;
      }
    }
    if(!args[0]) {
      return message.channel.send('**Coloque um id ou um nome de um bot para poder pesquisa-lo**')
    }
    axios({
      method: 'GET',
      headers: { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDE2MTExODU0MjY5MjM1MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA5MzY3NDkyfQ.M4Xj5ygdlkDdE9_C5EzoZ5uqa4nbX_Hg03v-MEiyuxA' }, // replace apicode with actual api key
      url: `https://top.gg/api/bots/${args[0]}`
    }).then(function(response) {
      let embed = new Discord.MessageEmbed()
      .setTitle('Bot pesquisado')
      .setColor('RANDOM')
      .addFields({name: 'Nome', value: response.data.username}, {name: 'Prefixo', value:  '`' + response.data.prefix + '`'}, {name: 'Descrição', value: response.data.shortdesc}, {name: 'Servidores adicionado', value: SetError(response.data.server_count)}, {name: 'Tags', value: '`' + response.data.tags + '`'}, {name: 'Invite', value: `[Clique aqui](${response.data.invite})`}, {name: 'Votos', value: response.data.points})
      .setThumbnail(`https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.webp`)
      message.channel.send(embed)
    }).catch(err => {
      message.channel.send('**Não consegui encontrar o bot!**')
    })
  }
}