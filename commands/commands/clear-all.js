module.exports = {
    commands: ['clearall', 'cc'],
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        //clears all text of an entire channel, only given to admins
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results)
        })
        },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}