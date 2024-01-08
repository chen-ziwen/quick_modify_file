const { desktopCapturer } = require("electron");

const getStream = {
    name: "getStream",
    type: "handle",
    callback: async () => {
        const streams = []
        await desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
            for (const source of sources) {
                streams.push(source);
            }
        })
        return streams;
    }
}

module.exports = [
    getStream,
]