import { Driver } from "../module/Driver";
import "../module";
import { PreloadHandler } from "./handler";


class PreloadAppLication {
    export() {
        const handler = new PreloadHandler();
        return Driver.export(handler);
    }
}

export const chiko = new PreloadAppLication();