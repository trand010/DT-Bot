module.exports = (bot, triggerText, replyText) => {
    bot.on('message', message => {
        if(message.content.toLowerCase() === triggerText.toLowerCase()){
            message.author.send(replyText)
        }
    })
}