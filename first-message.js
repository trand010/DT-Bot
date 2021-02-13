const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift() //this removes zero index and shift everything to left
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750)
    }
}

module.exports = async (bot, id, text, reactions = []) => {
    const channel = await bot.channels.fetch(id)

    channel.messages.fetch().then((messages) => {
        if (messages.size === 0) {
            //send a new message
            channel.send(text).then((message) => {
                addReactions(message, reactions)
            })
        } else {
            //edit message
            for (const message of messages) {
                console.log(message)
                message[1].edit(text)
                addReactions(message[1], reactions)
            }
        }
    })
}