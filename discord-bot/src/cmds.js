var ping = require('ping');
var FortniteWrapper = require('./fortnite/fortniteWrapper');

var api = new FortniteWrapper();

var cmds = {
    ping: pingCmd,
    fuckyou: fuckYouCmd,
    sah: sahCmd,
    fortnite: fortniteCmd
}

function fortniteCmd(bundle, args) {
    return new Promise((resolve, reject) => {
        api.playerProfile(args[0]).then(profile => {
            var message = {
                message: '',
                embed: {
                    title: 'Fortnite player stats for ' + profile.username,
                    color: 14889700,
                    description: '',
                    url: '',
                    timestamp: new Date(),
                    thumbnail: {
                        url: ''
                    },
                    footer: {
                        text: 'Stats provided by https://fortnitetracker.com'
                    },
                    fields: [
                        {
                            name: "Platform",
                            value: profile.platform,
                            inline: true
                        },
                        {
                            name: "Username",
                            value: profile.username,
                            inline: true
                        },
                        {
                            name: "Win Percentage",
                            value: profile.overall.winPct,
                            inline: true
                        },
                        {
                            name: "K/D",
                            value: profile.overall.killDeathPct,
                            inline: true
                        },
                        {
                            name: "Total Kills",
                            value: profile.overall.totalKills,
                            inline: true
                        },
                        {
                            name: "Average Survival Time",
                            value: profile.overall.avgSurvivalTime,
                            inline: true
                        },
                        {
                            name: "Total Matches Played",
                            value: profile.overall.totalMatchesPlayed,
                            inline: true
                        },
                        {
                            name: "Total Time Played",
                            value: profile.overall.totalTimePlayed,
                            inline: true
                        }

                    ]
                }
            };

            resolve(message);
        });
    });
}

function pingCmd(bundle, args) {
    var address = args[0];
    return ping.promise.probe(address).then((res) => {
        if (res.alive) {
            return "Host `" + address + "` is alive at ip `" + res.numeric_host + "` with an average response time of `" + res.time + "sec`.";
        } else {
            return "Host `" + address + "` is not alive.";
        }
    });
}

function fuckYouCmd(bundle, args) {
    return new Promise((resolve, reject) => {
        resolve(mention(bundle) + ' fuck you too');
        return;
    });
}

function sahCmd(bundle, args) {
    return new Promise((resolve, reject) => {
        resolve('sah ' + mention(bundle));
        return;
    });
}

function mention(bundle) {
    return '<@' + bundle.userId + '>';
}

module.exports = cmds;