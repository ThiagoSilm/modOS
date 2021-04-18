module.exports = {
    name: 'purge',
    description: 'apagar 1 ou 99 mensagens',
    execute(message, args) {
      if (message.channel.type === "dm") return;
      const amount = parseInt(args[0]) + 1;
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<a:checkno:738832502155903067>|Você não tem a permissão ``gerenciar mensagens``');
  
      if (isNaN(amount)) {
        return message.reply('isso não é um numero!');
      } else if (amount <= 1 || amount > 100) {
        return message.reply('você só pode apagar 99 mensagens');
      }
  
      message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel.send('não consegui apagar as mensagens');
      });
    },
  };