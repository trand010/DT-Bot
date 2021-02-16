const mongo = require('./mongo')
const command = require('./command')
const vietPhraseSchema = require('./schemas/phrase-schema')
const cron = require("node-cron")
const fs = require('fs')

module.exports = async (bot) => {
    const cache = {}

    command(bot, 'setphrase', async (message) => {
        const { member, channel, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send('You do not have permission to run this command')
            return
        }

        cache[guild.id] = [channel.id]

        await mongo().then(async (mongoose) => {
            try {
                await vietPhraseSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    id: guild.id,
                    channelId: channel.id,
                }, {
                    //insert and to update
                    upsert: true
                })
            } finally {
                mongoose.connection.close()
            }
        })
    })

    const perServer = async member => {
        const { guild } = member;

        let data = cache[guild.id]

        if (!data) {
            console.log('FETCHING FROM DATABASE')
            await mongo().then(async (mongoose) => {
                try {
                    const result = await vietPhraseSchema.findOne({ _id: guild.id })

                    if (result) {
                        cache[guild.id] = data = [result.channelId]
                    }
                } finally {
                    mongoose.connection.close()
                }
            })
        }

        //if the user has not set the channel to receive daily phrases
        //kick out of the function
        if (!data) {
            return
        }
        const channelId = data[0]
        const channel = guild.channels.cache.get(channelId)

        fs.readFile('vers-viet.txt', function (err, data) {
            if (err) throw err
            var lines = data.toString().split('\n')
            var random = Math.floor(Math.random() * lines.length)
            var viet = lines[random]

            fs.readFile('vers-english.txt', function (err, data) {
                if (err) throw err
                var lines = data.toString().split('\n')
                var english = lines[random]

                channel.send(`Phrase of the Week: ${viet}\n\nEnglish Translation: ${english}`)
            })
        })
    }

    //heroku host has a different timezone
    //8 am pst will post the message at 12 am meaning there is an 8 hour difference
    //for the message to be posted at 8 am, it would need to be 16 rather than 8 
    command(bot, 'rundailyphrase', message => {
        message.reply('Phrase command active')
        cron.schedule("0 17 * * *", function () {
            perServer(message.member)
        })
    })
}