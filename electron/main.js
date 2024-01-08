const { app, BrowserWindow } = require('electron')
const path = require('path');
const resloveHandel = require("./mainHandle/main");

const createWindow = () => {
    // 创建浏览窗口
    const win = new BrowserWindow({
        width: 1024,
        height: 576,
        icon: path.join(__dirname, '..', 'public/assets/dog.png'), // 开发路径
        autoHideMenuBar: true,
        // resizable: false, // 设置未不可调整大小
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        }
    })

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
    // 实现渲染进程与主进程通信
    resloveHandel();
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
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