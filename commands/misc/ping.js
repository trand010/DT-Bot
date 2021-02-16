module.exports = {
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.reply('Pong!')


        module.exports = (bot) => {
            let days = Math.floor(bot.uptime / 86400000)
            let hours = Math.floor(bot.uptime / 3600000) % 24
            let minutes = Math.floor(bot.uptime / 60000) % 60
            let seconds = Math.floor(bot.uptime / 1000) % 60

            message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`)
        }

    },

}

