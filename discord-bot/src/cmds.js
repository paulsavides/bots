var ping = require('ping');


var cmds = {
    ping: pingCmd,
    fuckyou: fuckYouCmd,
    sah: sahCmd
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