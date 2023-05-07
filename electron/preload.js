// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

contextBridge.exposeInMainWorld('electronAPI', {
    openFolder: () => ipcRenderer.invoke("dialog:openFolder"), // 打开文件夹
    openFile: () => ipcRenderer.invoke("dialog:openFile"), // 打开文件
    readFileContent: (url) => ipcRenderer.invoke('read-content', url), // 读取内容
    getFile: (url) => ipcRenderer.invoke('get-file', url), // 生成文件树
})
