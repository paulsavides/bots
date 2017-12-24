var ping = require('ping');


var cmds = {
    ping: pingCmd,
    fuckyou: fuckyouCmd
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

function fuckyouCmd(bundle, args) {
    return new Promise((resolve, reject) => {
        resolve('<@' + bundle.userId + '> fuck you too');
        return;
    });
}


module.exports = cmds;