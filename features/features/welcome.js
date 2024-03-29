const mongo = require('@util/mongo')
const command = require('@util/command')
const welcomeSchema = require('@schemas/welcome-schema')

module.exports = (bot) => {
    //!setwelcome <message>
    const cache = {} //guildId: [channelID, text]

    command(bot, 'setwelcome', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMINISTRATOR')) {
            channel.send('You do not have permission to run this command')
            return
        }

        let text = content

        const split = text.split(' ')
        if (split.length < 2) {
            channel.send('Please provide a welcome message')
            return
        }

        split.shift()
        text = split.join(' ')

        //stores in local cache so it does not have to fetch from data base
        cache[guild.id] = [channel.id, text]

        await mongo().then(async (mongoose) => {
            try {
                //if the data is already there, find it and update
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    channelId: channel.id,
                    text,
                }, {
                    //insert and to update
                    upsert: true
                })
            } finally {
                mongoose.connection.close()
            }
        })
    })
    const onJoin = async member => {
        const { guild } = member

        let data = cache[guild.id]

        if (!data) {
            //if there is no local data, must fetch from mongo database
            console.log('FETCHING FROM DATABASE')
            await mongo().then(async (mongoose) => {
                try {
                    const result = await welcomeSchema.findOne({ _id: guild.id })

                    cache[guild.id] = data = [result.channelId, result.text]
                } finally {
                    mongoose.connection.close()
                }
            })
        }

        //if the user has not set a welcome yet, this kicks out of the function
        //because it cannot run
        if(!data){
            return
        }
        const channelId = data[0]
        const text = data[1]

        const channel = guild.channels.cache.get(channelId)
        //this tags the user who joins the server
        channel.send(text.replace(/<@>/g, `<@${member.id}>`))
    }

    //to simulate someone joining the server for testing purposes
    command(bot, 'simjoin', (message) => {
        onJoin(message.member)
    })

    //when a user joins the server
    bot.on('guildMemberAdd', (member) => {
        onJoin(member)
    })
}









