const Discord = require('discord.js');
const ytdl = require("discord-ytdl-core");
const yts = require('yt-search');

module.exports = {
  name: 'play',
  description: 'comando de play',
  execute(message, args) {
    var musica = args[0];
    if (musica.split('https://youtu.be/')) {
      musica = musica;
    }
    const { videos } =  yts('jovem dex tapa');
    console.log(videos)


    if (!message.member.voice.channel) return message.channel.send("You're not in a voice channel?");
    let stream = ytdl(`${musica}`, {
      filter: "audioonly",
      opusEncoded: true,
      encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
    });

    message.member.voice.channel.join()
      .then(connection => {
        let dispatcher = connection.play(stream, {
            type: "opus"
          })
          .on("finish", () => {
            message.guild.me.voice.channel.leave();
          })
      });
  }
}