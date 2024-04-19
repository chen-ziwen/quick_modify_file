
export class PreloadCore {
    constructor(handler) {
        this.mPreloadHandler = handler;
    }

    send(channel, ...args) {
        this.mPreloadHandler.send(channel, ...args);
    }

    on(channel, listener) {
        this.mPreloadHandler.on(channel, listener);
    }

    invoke(channel, ...args) {
        return this, this.mPreloadHandler.invoke(channel, ...args);
    }

}