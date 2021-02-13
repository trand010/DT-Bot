//const { default: axios } = require('axios')
const Discord = require('discord.js')
const fetch = require('node-fetch')
const bot = new Discord.Client()

//logs in the bot for testing
//const config = require('./config.json')
const firstMessage = require('./first-message')
const command = require('./command')

bot.on('ready', () => {
  console.log('Hello World')

  //sends or edits the bots message
  // firstMessage(bot, '807843037425696781', 'hello world', ['❤'])

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
  command(bot, 'rquote', async(message) => {
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
  command(bot, 'dquote', async(message) => {
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
  command(bot, 'joke', async(message) => {
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

//bot.login(config.token);
//for heroku
bot.login(process.env.BOT_TOKEN)