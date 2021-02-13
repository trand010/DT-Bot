//const { default: axios } = require('axios')
const Discord = require('discord.js')
const fetch = require('node-fetch')
const bot = new Discord.Client()

//logs in the bot for testing
const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')
const mongo = require('./mongo')
const welcome = require('./welcome')

bot.on('ready', async () => {
  console.log('Hello World')

  //connects to mongo servers when bot goes online
  /*
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
  */
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

  //welcome bot per server rules using mongo servers
  welcome(bot)

  //sends or edits the bots message
  // firstMessage(bot, '807843037425696781', 'hello world', ['❤'])

  //dm's the user the current usable commands
  privateMessage(bot, '!help', `Here are the current commands:
 !ping = test if bot is online
 !servers = display amount of members in the current server 
 !cc = clear all messages in a channel (ADMIN)
 !status <input-phrase> = change the status of the bot
 !rquote = display a random quote
 !dquote = display the quote of the day
 !joke = display a random joke 
  `)

  //checks to see if bot is online
  command(bot, ['ping', 'test'], (message) => {
    message.channel.send('pong!')
  })

  //checks for total number of members on the channel
  command(bot, 'servers', (message) => {
    bot.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`)
    })
  })

  //clears all text of an entire channel, only given to admins
  command(bot, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  //changes the bots status
  command(bot, 'status', message => {
    const content = message.content.replace('!status ', '')
    //"!status hello world" -> "hello world"

    bot.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })

  //checks for keyword kimdahyun
  command(bot, 'kimdahyun', (message) => {
    message.reply('The Goddess of the Universe, Kim Dahyun')
    message.react("❤")
  })

  //checks for daily or random quote using an api
  command(bot, 'rquote', async (message) => {
    let getQuote = async () => {
      let result = await fetch
        ('https://zenquotes.io/api/random/')
      let json = await result.json()
      return json
    }

    let quote = await getQuote()
    message.reply(`
  "${quote[0].q}" - ${quote[0].a}
  `)
  })

  //checks for daily or random quote using an api
  command(bot, 'dquote', async (message) => {
    let getQuote = async () => {
      let result = await fetch
        ('https://zenquotes.io/api/today/')
      let json = await result.json()
      return json
    }

    let quote = await getQuote()
    message.reply(`
  "${quote[0].q}" - ${quote[0].a}
  `)
  })

  //generates a random joke from an api
  command(bot, 'joke', async (message) => {
    let getJoke = async () => {
      let result = await fetch
        ('https://official-joke-api.appspot.com/random_joke')
      let json = await result.json()
      return json
    }

    let joke = await getJoke()
    message.reply(`
    ${joke.setup} - 
    
    ${joke.punchline}
    `)
  })

  //checks for command clear and clears certain amount of lines
  command(bot, 'clear', (message) => {
    const content = message.content.replace('!clear ', '')
    if (content) {
      num = parseInt(content);
    }
    console.log(num);
    message.channel.bulkDelete(num);
    message.channel.send(`Deleted ${num} Total`);
  })
})

bot.login(config.token);
//for heroku
//bot.login(process.env.BOT_TOKEN)