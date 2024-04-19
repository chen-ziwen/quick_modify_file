import { Driver } from "../module/Driver";
import { PreloadHandler } from "./handler";
import "../module";


class PreloadAppLication {
    export() {
        const handler = new PreloadHandler();
        return Driver.export(handler);
    }
}

export const chiko = new PreloadAppLication();