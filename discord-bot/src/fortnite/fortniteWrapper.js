var FortniteApi = require('./fortniteApi');

module.exports = class FortniteWrapper {
    constructor() {
        this.api = new FortniteApi();
    }

    playerProfile(username, platform) {
        platform = platform === undefined ? 'pc' : platform;
        return this.api.getProfile(username, platform).then(profile => {
            if (profile.error !== undefined) {
                return {
                    error: "Sorry, no fortnite player named `" + username + "` found for platform `" + platform + "`."
                };
            }

            return mapProfile(profile);
        });
    }
}

function mapProfile(extended) {
    var lifetimeStats = toDict(extended.lifeTimeStats);
    return {
        platform: extended.platformNameLong,
        username: extended.epicUserHandle,
        overall: {
            winPct: lifetimeStats['Win%'],
            killDeathPct: lifetimeStats['K/d'],
            totalKills: lifetimeStats['Kills'],
            avgSurvivalTime: lifetimeStats['Avg Survival Time'],
            totalMatchesPlayed: lifetimeStats['Matches Played'],
            totalTimePlayed: lifetimeStats['Time Played'],
            totalScore: lifetimeStats['Score']
        }
    };
}


function toDict(arr) {
    var bundle = {};
    for (var ix in arr) {
        bundle[arr[ix].key] = arr[ix].value;
    }

    return bundle;
}