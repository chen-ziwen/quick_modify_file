import { PreloadCore } from "./core";
import { Driver } from "./Driver";

class Dialog extends PreloadCore {
    constructor(handler) {
        super(handler);
        this.mHandler = [];
        this.on("dialog", (_, ...args) => {
            if (this.mHandler) {
                this.mHandler.forEach((handler) => {
                    handler(...args);
                });
                this.mHandler.length = 0;
            }
        })
    }

    on(fn) {
        this.mHandler.push(fn);
    }

    open(...args) {
        this.send("window-event", "dialog", ...args);
    }

    result(result) {
        this.send("dialog", result);
    }
}

Driver.use("dialog", Dialog);

