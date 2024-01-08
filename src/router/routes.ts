import MainPage from '@/components/MainPage.vue';

export default {
    path: '/',
    name: 'mainPage',
    redirect: { name: 'file-reslove' }, // 重定向为子路径 相当于一开打就默认选中顶层路径下的重定向子路由
    meta: {
        title: '主页'
    },
    component: MainPage,
    children: [
        {
            path: 'file-reslove',
            name: 'file-reslove',
            meta: {
                title: '文件处理'
            },
            component: () => import("@/view/FileReslove.vue"),
        },
        {
            path: 'tips',
            name: 'tips',
            meta: {
                title: '使用说明'
            },
            component: () => import("@/view/Tips.vue"),
        },
        {
            path: 'capture',
            name: 'capture',
            component: () => import("@/view/Capture.vue"),
        },
    ]
};