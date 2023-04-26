// main.js
// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
// electron 其实就是相当于把一个浏览器完完整整的塞入到electron应用中，所以打包出来的文件会比较大。
// 本地开发的时候，需要先运行前端项目，开启本地服务器，再执行electron命令，将内容挂载在electron容器中。
// 比较反人类的操作就是需要开启两个终端，这边我使用concurrently这个库解决了这个问题，它可以同时调用多个命令。
// cross-env包 可以在运行script脚本的时候往环境变量中添加属性，后续就可以通过这个属性来判断项目是在开发环境还是生产环境。
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const { handleFileOpen, handleFileOpenFolder, readFileContent, handleGetFile } = require('./mainHandle/mainHandle');

const createWindow = () => {
    // 创建浏览窗口
    const win = new BrowserWindow({
        width: 640,
        height: 360,
        icon: path.join(__dirname, '..', 'public/assets/dog.png'), // 开发路径
        autoHideMenuBar: true,
        resizable: false, // 设置未不可调整大小
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        }
    })

    console.log('url', path.join(__dirname, '..', './public/assets/vite.svg'))

    // 判断是开发环境还是生产环境，必须括号包裹否则会因为运算符权重问题导致判断失败 
    if (process.env.NODE_ENV === 'development') {
        // 开发环境 
        const url = 'http://127.0.0.1:5173/'; // 当你使用框架开发时，启动本地服务器的域名
        win.loadURL(url);
    } else {
        // 生产环境
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }


    // 打开开发工具
    // win.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.handle('dialog:openFolder', handleFileOpenFolder);
    ipcMain.handle('read-content', readFileContent);
    ipcMain.handle('get-file', handleGetFile);
    createWindow() // 创建窗口
    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。