import { ipcRenderer } from "electron";

export class PreloadHandler {
    on(channel, listener) {
        ipcRenderer.on(channel, listener);
    }

    send(channel, ...args) {
        ipcRenderer.send(channel, ...args);
    }

    invoke(channel, ...args) {
        return ipcRenderer.invoke(channel, ...args);
    }
}