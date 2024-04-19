import { contextBridge } from "electron";

import { chiko } from "./app-adapter";

// 暴露渲染进程的所有方法
contextBridge.exposeInIsolatedWorld("chiko", chiko.export());