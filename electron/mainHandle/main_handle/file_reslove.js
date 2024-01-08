const fs = require("fs/promises");
const path = require("path");
const { necessary, optional } = require("../../config/theme_check");
const extraFolder = require("../../config/extra-folder");

const checkoutFileIsExists = async (src,t = true) => {
    try {
        await fs.access(src,fs.constants.F_OK);
        return true;
    } catch (err) {
        if (t) {
            if (err.code == "ENOENT") {
                return false;
            } else {
                throw err;
            }
        } else {
            throw err;
        }
    }
};

const checked = async (pt,obj,callback) => {
    for (let theme of Object.keys(obj)) {
        const realPath = path.join(pt,'切图',theme);
        const info = await checkoutFileIsExists(realPath);
        const key = info ? "suc" : "err";
        callback(realPath,info,key);
    }
}

const listInfos = {
    suc: [],
    err: [],
    disabled:true,
};

function setListInfos() {
    listInfos.suc.length = 0;
    listInfos.err.length = 0;
    listInfos.disabled = true;
}

// 检查文件夹路径是否正确
const checkFolderName = {
    name: "checkFolderName",
    type: "handle",
    callback: async (_, pt) => {
        setListInfos();
        try {
           await checkoutFileIsExists(pt, false);
           await checked(pt, necessary, (realPath, info,key) => {
                const text = info ? "(必须资源) 当前路径下资源存在，检测成功！" : "(必须资源) 当前路径下，资源不存在。请仔细检查该路径下的资源是否存在或命名是否规范!";
                listInfos[key].push({ path: realPath, text });
            });
           if (listInfos.err.length == 0) {
               listInfos.disabled = false;
            }
           await checked(pt, optional, (realPath,info,key) => {
                const text = info ? "(非必须资源) 当前路径下资源存在，检测成功！" : "(非必须资源) 当前路径下，资源不存在。请仔细检查该路径下的资源是否存在或命名是否规范!";
                listInfos[key].push({ path: realPath, text });
            });
            return listInfos;
        }catch (err) {
            console.error(err, 'check file fail');
            throw err;
        };
    }
}


// 复制资源路径的图片到项目路径
const copyFileResource = {
    name: "copyFileResource",
    type: "handle",
    callback: async (_, { theme, src, destPath }) => {
        setListInfos();
        try {
            for (const folder of extraFolder) {
                const realPath = path.join(src, folder.replaceAll("${theme}", theme));
                await fs.mkdir(realPath, { recursive: true }); // 递归创建文件夹
            };
            for (const [key, value] of Object.entries(Object.assign({},necessary,optional))) {
                const resource = path.join(destPath, "切图", key); // 资源目录
                const dest = path.join(src, value).replaceAll("${theme}", theme); // 项目地址
                const isExists = await checkoutFileIsExists(resource); // 判断资源目录的图片路径是否存在
                if (isExists) {
                    await fs.copyFile(resource, dest); // 将资源目录图片复制到项目目录
                    listInfos.suc.push({ path: resource, text: `资源图片已成功复制到开发项目的 “${dest}” 路径下！`});
                } else {
                    listInfos.err.push({ path: resource, text: "当前路径下的资源不存在，复制失败！" });
                }
            }
            return listInfos;
        } catch (err) {
            console.error('copy file fail', err);
            throw err;
        }
    },
};

module.exports = [
    checkFolderName,
    copyFileResource,
]