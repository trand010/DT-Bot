const fetch = require('node-fetch')

module.exports = {
    commands: ['dq', 'dquote', 'dailyquote'],
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {

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
    },
}


