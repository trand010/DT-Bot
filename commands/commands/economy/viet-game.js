const economy = require('@features/economy')

module.exports = {
    commands: 'game',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<Amount of coins>",
    callback: async (message, arguments, text, bot) => {
        const { member } = message

        const emojis = ["🐟", "🦐", "🐔", "🦀", "🍉", "🦌"]

        message.channel.send('Welcome to the game, react on the one you think will win!')
            .then((message) => {

                for (var i = 0; i < 6; ++i) {
                    message.react(emojis[i])
                }
            })

        //const filter = (user) => user.id === member.id

        message.awaitReactions(filter, r => ["🐟", "🦐", "🐔", "🦀", "🍉", "🦌"].includes(r.emoji.name),
            { max: 1, time: 5000 })
            .then(collected => {
                let reaction = collected.first();

                if (reaction.emoji.name === '🐟') {
                    console.log("test")
                    return 0;
                }
                if (reaction.emoji.name === '🦐') {
                    return 1;
                }
                if (reaction.emoji.name === '🐔') {
                    return 2;
                }
                if (reaction.emoji.name === '🦀') {
                    return 3;
                }
                if (reaction.emoji.name === '🍉') {
                    return 4;
                }
                if (reaction.emoji.name === '🦌') {
                    return 5;
                }
            })

        var dice1 = Math.floor(Math.random() * 5)
        var dice2 = Math.floor(Math.random() * 5)
        var dice3 = Math.floor(Math.random() * 5)

        message.channel.send(`You rolled: ${emojis[dice1]}, ${emojis[dice2]}, ${emojis[dice3]}`)
    }
}