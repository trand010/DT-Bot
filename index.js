//const { default: axios } = require('axios')
const Discord = require('discord.js')
const bot = new Discord.Client()

//logs in the bot for testing
require('events').EventEmitter.defaultMaxListeners = 25;
const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')
const mongo = require('./mongo')
const welcome = require('./welcome')
const messageCount = require('./message-counter')
const path = require('path')
const fs = require('fs')
const phrases = require('./viet-daily')

bot.on('ready', async () => {
  console.log('Hello World')

  //connects to mongo servers when bot goes online
  //mongodb will host the data 24/7 for the bot to access
  const connectToMongoDB = async () => {
    await mongo().then((mongoose) => {
      try {
        //try some code
        console.log('Connected to mongo')
      } finally {
        //will always run
        mongoose.connection.close()
        //this will close the database
      }
    })
  }
  connectToMongoDB()

  //advanced command handler
  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  //imports all new commands automatically
  const readCommands = dir => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      //searches the misc directory
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) { //handle the files
        const option = require(path.join(__dirname, dir, file))
        commandBase(bot, option)
      }
    }
  }
  readCommands('commands')

  //welcome bot per server rules using mongo servers
  welcome(bot)

  //counts the amount of messages per user
  messageCount(bot)

  //sends a phrase every day at 8 am
  phrases(bot)

  //sends or edits the bots message, very buggy still
  //firstMessage(bot, '807843037425696781', 'hello world', ['❤'])

  //dm's the user the current usable commands
  privateMessage(bot, '?help', `Here are the current commands:
 ?ping = test if bot is online
 ?uptime = displays how long the bot has been online
 ?servers = display amount of members in the current server 
 ?cc = clear all messages in a channel (ADMIN ONLY)
 ?clear <num> = clear certain number of messages (ADMIN ONLY)
 ?status <phrase> = change the status of the bot
 ?randomquote = display a random quote
 ?dailyquote = display the quote of the day
 ?joke = display a random joke 
 ?setwelcome = set the welcome message when users join the server
 ?simjoin = simulate a user joining the channel (testing purposes)
 ?add <num1> <num2> = add two numbers together
 ?phrase = random phrase in vietnamese and english
  `)
})

//checks the uptime of the bot
command(bot, 'uptime', (message) =>{
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

//for testing purposes, local hosting
//bot.login(config.token)
//for heroku, 24/7 bot hosting
bot.login(process.env.BOT_TOKEN)