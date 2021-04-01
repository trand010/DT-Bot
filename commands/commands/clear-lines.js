//checks for command clear and clears certain amount of lines
module.exports = {
    commands: ['clear'],
    expectedArgs: '<num>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const num = +arguments[0]

        message.channel.bulkDelete(num);
        message.channel.send(`Deleted ${num} Total`);
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
}
 