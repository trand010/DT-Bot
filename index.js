//const { default: axios } = require('axios')
const Discord = require('discord.js')
const fetch = require('node-fetch')
const bot = new Discord.Client()

//logs in the bot for testing
//const config = require('./config.json')
bot.on('ready', () => {
  console.log('Hello World')
})

const prefix = '!'
bot.on('message', async (msg) => {
  if (msg.content[0] !== prefix) {
    console.log('no prefix')
    return
  }

  //checks for user for the entered command
  const args = msg.content.slice(prefix.length).trim().split(' ')
  console.log(args)
  const command = args.shift().toLowerCase()
  console.log(command)

  //checks for keyword kimdahyun
  const goddess = 'kimdahyun'
  if (command === goddess.toLowerCase()) {
    msg.react("❤")
    msg.reply('The Goddess of the Universe, Kim Dahyun')
  }

  //checks for command clear and clears certain amount of lines
  if (command === "clear") {
    let num = 2;
    if (args[0]) {
      num = parseInt(args[0]) + 1;
    }
    console.log(num);
    msg.channel.bulkDelete(num);
    msg.channel.send(`Deleted ${args[0]} Total`);
  }

  if (command === "dquote" || command === "rquote") {
    let getQuote = async () => {
      if (command === "dquote") {
        let result = await fetch
          ('https://zenquotes.io/api/today/')
        let json = await result.json()
        return json
      }
      else{
        let result = await fetch
          ('https://zenquotes.io/api/random/')
        let json = await result.json()
        return json
      }
    }

    let quote = await getQuote()
    msg.reply(`
    "${quote[0].q}" - ${quote[0].a}
    `)
  }

  if (command === "joke") {
    let getJoke = async () => {
      let result = await fetch
        ('https://official-joke-api.appspot.com/random_joke')
      let json = await result.json()
      return json
    }

    let joke = await getJoke()
    msg.reply(`
    ${joke.setup} - 
    
    ${joke.punchline}
    `)
  }

})
//bot.login(config.token);
//for heroku
bot.login(process.env.BOT_TOKEN)