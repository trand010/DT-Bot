//a more advanced command handler designed to deal with multiple arguments/text commands
const { prefix } = require('@root/config.json')
const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission code "${permission}"`)
        }
    }
}

module.exports = (bot, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You do not have permission to run this command',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback,
    } = commandOptions

    //Ensure the command and aliases are in an array
    if (typeof commands === 'string') {
        commands = [commands]
    }

    console.log(`Registering command "${commands[0]}"`)

    //Ensure the permissions are in an array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }
    //listen for messages
    bot.on('message', message => {
        const { member, content, guild } = message

        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                //a command has been ran

                // Ensure the user has the required permissions
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError)
                        return
                    }
                }

                //Ensure the user has the rquired roles
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role =>
                        role.name === requiredRole)

                    if(!role || !member.roles.cache.has(role.id)){
                        message.reply(`You must have the "${requiredRole}" role to use this command.`)
                        return
                    }
                }

                //Split on any number of spaces
                const arguments = content.split(/[ ]+/)

                //remove the command which is the first index
                arguments.shift()
                
                //Ensure we have correct number of arguments
                if(arguments.length < minArgs || (
                    maxArgs !== null && arguments.length > maxArgs
                )){
                    //!addition 5 10 20
                    //incorrect syntax! Use !add <num1> <num2>
                    message.reply(`Incorrect syntax! Use ${prefix}${alias}${expectedArgs}`)
                    return                    
                }

                //Handle the custom command code
                // ['5', '10']
                // '5 10'
                callback(message, arguments, arguments.join(''), bot)
                return
            }
        }
    })
}