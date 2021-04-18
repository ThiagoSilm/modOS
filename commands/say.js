module.exports = {
    name: 'say',
    description: 'falar no canal',
    guildOnly: true,
    execute(message, args) { 
      if (message.channel.type === "dm") return;
      const msg = args.join(" ");
    message.delete().catch(O_o => {});
    message.channel.send(`${msg}\n\nMensagem enviada por: ${message.author}`);
}
}