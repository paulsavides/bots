var config = require('./config/config')
const https = require('https');

module.exports = class FortniteApi {
    constructor() {
        this.apiKey = config.APIKEY;
        this.urlBase = config.URLBASE;
        this.rateRemaining = 30;
        this.rateCurrentTime = Date.now();
    }

    rateLimited() {
        var now = Date.now();
        var then = this.rateCurrentTime;

        var minutes = Math.round(((now - then % 86400000) % 3600000) / 60000); 

        return (this.rateRemaining < 10) && (minutes < 1);
    }

    updateRateLimit(headers) {
        this.rateRemaining = headers['x-ratelimit-remaining-minute'];
        this.rateCurrentTime = Date.now();
    }

    getProfile(user, platform) {
        return new Promise((resolve, reject) => {
            platform = platform === undefined ? 'pc' : platform;
            var options = this.buildOptions('profile/' + platform + '/' + user);
            
            if (this.rateLimited()) {
                reject('Rate limited wait a moment');
            }

            var respBody = '';

            https.get(options, (res) =>  {
                this.updateRateLimit(res.headers);

                res.on('data', (data) => {
                    respBody += data;
                });

                res.on('end', () => {
                    resolve(JSON.parse(respBody));
                });
            })
        });
    }

    buildOptions(path) {
        return {
            host: 'api.fortnitetracker.com',
            port: 443,
            path: '/v1/' + path,
            method: 'GET',
            headers: {
                'TRN-Api-Key': this.apiKey
            }
        }
    }
}