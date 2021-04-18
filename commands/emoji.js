module.exports = {
  name: 'emoji',
  description: 'ver o emoji em png',
  execute(message, args) {
    if (message.channel.type === "dm") return;
    let argu = args[0].split(":", 2)
    let emoji = message.client.emojis.cache.find(emoji => emoji.name ===argu.join(""));
    if (emoji) {
      message.channel.send(`${emoji.url}?size=2048`);
    }
    else {
      message.channel.send('<a:checkno:738832502155903067>|tente assim: &emoji` `nome do emoji`');
    }

  }

};