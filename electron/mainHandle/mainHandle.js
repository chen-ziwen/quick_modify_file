const { dialog } = require('electron');
const fs = require('fs');
const { handleGetFile } = require('./createFileTree')
// 打开文件
const handleFileOpen = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openFile']
    });
    if (canceled) {
        console.log('取消选择文件');
        return;
    } else {
        return filePaths[0];
    }
};

// 打开文件夹
const handleFileOpenFolder = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    if (canceled) {
        console.log('取消选择文件夹');
        return;
    } else {
        return filePaths[0];
    }
}

// 读取文件的内容
const readFileContent = (_, path) => {
    return new Promise((reslove, reject) => {
        console.log('path---------->', path)
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                reslove(data);
            }
        })
    })
}




module.exports = {
    handleFileOpen,
    handleFileOpenFolder,
    readFileContent,
    handleGetFile,
}