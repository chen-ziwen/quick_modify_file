// 生成文件树
const fs = require('fs');
const path = require('path');
// 传入一个文件夹 生成一个文件树
const readDirAll = (url, index) => {
    const data = { path: url, title: path.basename(url), type: 'directory', deep: index, extname: '', child: [] };
    fs.readdirSync(url).map(file => {
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
    const result = readDirAll(url, 0);
    return result;
}

module.exports = {
    handleGetFile,
}
