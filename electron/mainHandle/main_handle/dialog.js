const { dialog } = require("electron");

// 打开文件
const openFile = {
    name: "dialog:openFile",
    type:"handle",
    callback : async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            properties: ['openFile'],
        });
        if (canceled) {
            return {
                status:false,
                message: "cancel",
                path: '',
    
            };
        } else {
            return {
                status:true,
                message: "success",
                path: filePaths[0],
            };
        }
    }
}

// 打开文件夹
const openFolder = {
    name: "dialog:openFolder",
    type:"handle",
    callback: async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            properties: ['openDirectory'],
        });
        if(canceled) {
            return {
                status:false,
                message: "cancel",
                path:'',
    
            };
        } else {
            return {
                status: true,
                message: "success",
                path:filePaths[0],
            };
        }
    }
}

module.exports = [
    openFile,
    openFolder
]

