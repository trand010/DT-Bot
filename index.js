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

  if (command === "quote") {
    let getQuote = async () => {
      let result = await fetch
      //('https://official-joke-api.appspot.com/random_joke')
      ('https://zenquotes.io/api/today/')
      let json = await result.json()
      return json
    }

    let quote = await getQuote()
    msg.reply(`
    "${quote[0].q}" - ${quote[0].a}
    `)
  }

  //clears messages from certain user
  /*
  const user = msg.mentions.users.first()
  const messageList = msg.channel.message.fetch({limit: 100})
  */

})
//bot.login(config.token);
//for heroku
bot.login(process.env.BOT_TOKEN)