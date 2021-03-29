const cron = require("node-cron")
const fetch = require('node-fetch')
const fs = require('fs')

module.exports = async (bot) => {

    //sends a weekly viet phrase every monday at 8:00 am
    cron.schedule("0 16 * * 1", function () {
        fs.readFile('vers-viet.txt', function (err, data) {
            if (err) throw err
            var lines = data.toString().split('\n')
            var random = Math.floor(Math.random() * lines.length)
            var viet = lines[random]

            fs.readFile('vers-english.txt', function (err, data) {
                if (err) throw err
                var lines = data.toString().split('\n')
                var english = lines[random]

                const channel = bot.channels.cache.get('420883043818143744')
                channel.send(`Phrase of the Week: ${viet}\n\nEnglish Translation: ${english}`)
            })
        })
    })

    //sends a daily quote every day at 11:11 am
    cron.schedule("11 19 * * *", async function () {
        let getQuote = async () => {
            let result = await fetch
                ('https://zenquotes.io/api/today/')
            let json = await result.json()
            return json
        }

        const channel = bot.channels.cache.get('420883043818143744')
        let quote = await getQuote()
        channel.send(`
    "${quote[0].q}" - ${quote[0].a}
      `)
    })
}