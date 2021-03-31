//const { default: axios } = require('axios')
const Discord = require('discord.js')
const bot = new Discord.Client()

//logs in the bot for testing
require('events').EventEmitter.defaultMaxListeners = 25;
const config = require('./config.json')
const loadCommands = require('./commands/load-commands')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')
const welcome = require('./welcome')
const messageCount = require('./message-counter')
const phrases = require('./viet-daily')
const scheduled = require('./scheduled-msg')
const scalingChannels = require('./scale-channels');

bot.on('ready', async () => {
  console.log('Hello World')

  //sets the status of the bot
  bot.user.setPresence({
    activity: {
      name: '"?help" for help',
    },
  })

  //loads all commands 
  loadCommands(bot)

  //has the scheduled viet phrase and daily quote
  scheduled(bot)

  //welcome bot per server rules using mongo servers
  welcome(bot)

  //counts the amount of messages per user
  messageCount(bot)

  //sends a phrase every day at 8 am
  phrases(bot)

  //scales channel when user joins
  scalingChannels(bot)

  //sends or edits the bots message, only works for bot only channel
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
 ?joke = display a random joke 
 ?setwelcome <text> = set the welcome message when users join the server
 ?simjoin = simulate a user joining the channel (testing purposes)
 ?plus <num1> <num2> = add two numbers together
 ?phrase = random phrase in vietnamese and english
 ?addbal @username <amount> = adds coins to a specific user (ADMIN ONLY)
 ?bal = displays users balance
 ?pay @username <amount> = pay coins to a specific user
  `)
})

//for testing purposes, local hosting
bot.login(config.token)
//for heroku, 24/7 bot hosting
//bot.login(process.env.BOT_TOKEN)