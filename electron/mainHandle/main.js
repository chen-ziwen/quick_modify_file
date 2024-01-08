const { ipcMain } = require('electron');
const mainHandle = require("./main_handle");

const resloveHandel = () => {
    for (let value of mainHandle) {
        if (typeof value.callback == "function") {
            ipcMain[value.type](value.name, value.callback);
        }
    }
}

module.exports = resloveHandel;

