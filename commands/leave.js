module.exports = {
  name: 'leave',
  description: 'sair do canal',
  execute(message) {
    message.guild.voice.channel.leave();
  }
}