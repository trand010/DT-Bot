module.exports = {
    commands: ['status'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, bot) => {
        const content = message.content.replace('?status ', '')
        //"!status hello world" -> "hello world"

        bot.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
},
}