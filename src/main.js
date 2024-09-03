import { createApp } from "vue";
import { createPinia } from 'pinia'
// 全局样式
import "./styles/index.less";
// tailwindcss
// import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia()
import Vant  from 'vant'
import 'vant/lib/index.css';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Vant)
app.mount("#app");
