var Discord = require('discord.io');
var auth = require('./auth.json')
var cmds = require('./cmds');

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('logged in as: ' + bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function(user, userId, channelId, message, evt) {
    if (message.substring(0,1) == '!') {
        var bundle = {
            user: user,
            userId: userId,
            channelId: channelId,
            message: message,
            evt: evt
        };

        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        bot.se
        if (cmds[cmd] !== undefined) {
            cmds[cmd](bundle, args).then(msg => {
                if (typeof msg === 'string')  {
                    bot.sendMessage({
                        to: channelId,
                        message: msg
                    });

                    return;
                }

                // processing a message object
                msg.to = channelId; // set the channel id for convenience
                bot.sendMessage(msg, (err) => {
                    if (err !== null) {
                        console.log(err);
                    }
                });
            });
        }
    }
});