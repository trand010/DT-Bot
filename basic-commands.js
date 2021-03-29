const command = require('./command')

module.exports = async (bot) => {
  //checks the uptime of the bot
  command(bot, 'uptime', (message) => {
    let days = Math.floor(bot.uptime / 86400000)
    let hours = Math.floor(bot.uptime / 3600000) % 24
    let minutes = Math.floor(bot.uptime / 60000) % 60
    let seconds = Math.floor(bot.uptime / 1000) % 60

    message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`)
  })

  //checks for total number of members on the channel
  command(bot, 'servers', (message) => {
    bot.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`)
    })
  })

  //changes the bots status
  command(bot, 'status', message => {
    const content = message.content.replace('?status ', '')
    //"!status hello world" -> "hello world"

    bot.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })
}