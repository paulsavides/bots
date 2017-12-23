var Discord = require('discord.io');
var auth = require('./auth.json')
var ping = require('ping');

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('logged in as: ' + bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function(user, userID, channelID, message, evt) {
    if (message.substring(0,1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'fuckyou':
                bot.sendMessage({
                    to: channelID,
                    message: '<@' + userID + '> fuck you too'
                });
                break;
            case 'ping':
                pingCheck(args[0]).then(msg => {
                    bot.sendMessage({
                        to: channelID,
                        message: msg
                    });
                });
                break;
        }
    }
});

function pingCheck(address) {
    return ping.promise.probe(address).then(res => {
        if (res.alive) {
            return "Host `" + address + "` is alive at ip `" + res.numeric_host + "` with an average response time of `" + res.time + "sec`.";
        } else {
            return "Host `" + address + "` is not alive.";
        }
    });
}