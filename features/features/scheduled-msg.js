const cron = require("node-cron")
const fetch = require('node-fetch')
const fs = require('fs')

module.exports = async (bot) => {

    //sends a weekly viet phrase every monday at 8:00 am
    /*
    cron.schedule("0 15 * * *", function () {
        fs.readFile('vers-viet.txt', function (err, data) {
            if (err) throw err
            var lines = data.toString().split('\n')
            var random = Math.floor(Math.random() * lines.length)
            var viet = lines[random]

            fs.readFile('vers-english.txt', function (err, data) {
                if (err) throw err
                var lines = data.toString().split('\n')
                var english = lines[random]

                //420883043818143744 is the id of the other channel
                const channel = bot.channels.cache.get('772294720037847090')
                channel.send(`Phrase of the Day: ${viet}\n\nEnglish Translation: ${english}`)
            })
        })
    })
    */

    //sends a daily quote every day at 11:11 am
    cron.schedule("11 18 * * *", async function () {
        let getQuote = async () => {
            let result = await fetch
                ('https://zenquotes.io/api/today/')
            let json = await result.json()
            return json
        }

        const channel = bot.channels.cache.get('420883043818143744')
        let quote = await getQuote()
        channel.send(`Quote of the Day:

    "${quote[0].q}" - ${quote[0].a}
      `)
    })
}