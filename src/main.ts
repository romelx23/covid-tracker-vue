import { createApp } from "vue";
import "./index.css";
import {createPinia} from 'pinia';
import App from "./App.vue";
import router from "./router/router";

const app=createApp(App)
app.use(router)
app.use(createPinia())
app.mount("#app");
