const { dialog } = require('electron');
const handleFileOpen = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties:['openFile', 'openDirectory']
    }); 
    if (canceled) {
        console.log('取消选择文件');
        return;
    } else {
        return filePaths[0];
    }
}

module.exports = {
    handleFileOpen,
}