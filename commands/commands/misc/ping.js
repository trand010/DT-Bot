module.exports = {
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, bot) => {
        message.reply('Calculating ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            resultMessage.edit(`Bot Latency: ${ping}, API Latency: ${bot.ws.ping}`)
        })
    },
}

