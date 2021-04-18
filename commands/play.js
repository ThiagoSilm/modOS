const Discord = require('discord.js');
const ytdl = require("discord-ytdl-core");
const Youtube = require('discord-youtube-api');
const youtube = new Youtube('AIzaSyBku-b9N9VNo2nK0ViyHXZ3ZpqtrKCYHtQ');

module.exports = {
  name: 'play',
  description: 'comando de play',
  execute(message, args) {
    var musica = args[0];
    if (musica.split('https://youtu.be/')) {
      musica = musica;
    }
      const video3 = youtube.searchVideos("jovem dex").then(function(video) {
      console.log(video)
      })
      
    


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