interface FileInfos {
    message: string;
    path: string;
    status: boolean;
}
declare interface Window {
    electronAPI: {
        openFile: () => Promise<FileInfos>,
        openFolder: () => Promise<FileInfos>,
        checkFolderName: (path: string) => Promise<any>,
        copyFileResource: ({ theme: string, src: string, destPath: string }) => Promise<any>;
        getStream: () => Promise<any[]>;
    }
}