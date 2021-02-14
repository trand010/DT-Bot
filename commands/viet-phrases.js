const fs = require('fs')

module.exports = {
    commands: ['phrase'],
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {

        fs.readFile('vers-viet.txt', function (err, data) {
            if (err) throw err
            var lines = data.toString().split('\n')
            var random = Math.floor(Math.random() * lines.length)
            var viet = lines[random]

            fs.readFile('vers-english.txt', function (err, data) {
                if (err) throw err
                var lines = data.toString().split('\n')
                var english = lines[random]

            message.channel.send(`Here is a phrase in Vietnamese: ${viet} 
        English Translation: ${english}`)
            })
        })
    },
}