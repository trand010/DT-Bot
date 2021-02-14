module.exports = {
    commands: ['kimdahyun'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.reply('The Goddess of the Universe, Kim Dahyun')
        message.react("❤")
    },
}
