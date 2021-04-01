const mongo = require('@util/mongo')
const messageCountSchema = require('@schemas/message-schema')

module.exports = bot => {
    bot.on('message', async (message) => {
        const { author } = message
        const { id } = author

        await mongo().then(async (mongoose) => {
            try {
                await messageCountSchema.findOneAndUpdate(
                    {
                        _id: id,
                    },
                    {
                        //mongo command to increment
                        $inc: {
                            messageCount: 1,
                        },
                    },
                    {
                        //upload and insert
                        upsert: true
                    }).exec() //execute
            } finally {
                mongoose.connection.close();
            }
        })

        console.log('AUTHOR:', author)
    })
}