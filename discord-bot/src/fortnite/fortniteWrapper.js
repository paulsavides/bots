var FortniteApi = require('./fortniteApi');

module.exports = class FortniteWrapper {
    constructor() {
        this.api = new FortniteApi();
    }

    playerProfile(username, platform) {
        return this.api.getProfile(username, platform).then(profile => {
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