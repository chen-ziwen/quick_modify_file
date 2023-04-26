import { createApp } from 'vue';
import './style.scss';
// import './assets/common.css';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
