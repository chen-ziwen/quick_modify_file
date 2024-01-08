const dialog = require('./dialog');
const file_reslove = require('./file_reslove');
const capture = require("./capture");

const mainHandle = [
    ...dialog,
    ...file_reslove,
    ...capture,
]
module.exports = mainHandle;