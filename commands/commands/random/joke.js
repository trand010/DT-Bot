const fetch = require('node-fetch')

//generates a random joke from an api
module.exports = {
    commands: ['joke'],
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {

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
    },
}