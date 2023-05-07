// 生成文件树
const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');
// 传入一个文件夹 利用递归生成一个文件树
const readDirAll = (url, index) => {
    const data = { path: url, title: path.basename(url), type: 'directory', deep: index, extname: '', child: [] };
    fs.readdirSync(url).forEach(file => {
        const realUrl = path.join(url, file); // 拼接出绝对路径
        const isDirectory = fs.statSync(realUrl).isDirectory(); // 判断是否是文件夹
        if (isDirectory) {
            data.child.push(readDirAll(realUrl, index + 1))
        } else {
            data.child.push({ path: realUrl, title: path.basename(realUrl), type: 'file', deep: index + 1, extname: path.extname(file) })
        }
    })
    return data;
}
const handleGetFile = (_, url) => {
    const data = readDirAll(url, 0);
    if (!data) return;
    const result = resloveChild(data, 0);
    saveFileContent(result); // 生成文件树并打开下载文件夹
    // printFileTree(result);
    // printJSONTree(result);
    return data;
}
// 输出JSON格式目录树
function printJSONTree(data) {
    fs.writeFile('md.json', JSON.stringify(data), 'utf-8', (error) => {
        if (error) {
            return console.log("写入失败");
        }
        return console.log("写入成功");
    })
}
// 输出目录树
function printFileTree(data) {
    if (!data) return;
    const result = resloveChild(data, 0);
    fs.writeFile('md.txt', result, 'utf-8', (error) => {
        if (error) {
            return console.log('写入失败');
        }
        return console.log('写入成功');
    })
}

function resloveChild(data) {
    let result = '';
    result += `${addSpace(data.deep)}${data.title}\n`;
    data.child.forEach(item => {
        const nChild = item.child || [];
        if (nChild.length > 0) {
            result += resloveChild(item, item.deep);
        } else {
            result += `${addSpace(item.deep)}${item.title}\n`;
        }
    })
    return result;
}
// 添加空格
function addSpace(index) {
    let str = '';
    for (let i = 0; i < index; i++) {
        str += '    ';
    }
    str += "|—— ";
    return str;
}

// 下载文件，并保存到指定的位置
const saveFilePath = (fileName, content) => {
    fs.writeFile(fileName, content, 'utf-8', (error) => {
        if (error) {
            console.error(error, '写入失败');
        } else {
            console.log('文件已保存');
        }
    })
}
const saveFileContent = (content) => {
    dialog.showSaveDialog({
        filters: [{ name: 'text', extensions: ['txt'] }],
        defaultPath: 'tree.txt', // 默认文件名
    }).then(result => {
        if (!result.canceled) {
            saveFilePath(result.filePath, content)
        }
    }).catch(error => {
        console.error(error);
    });
}

module.exports = {
    handleGetFile,
}
