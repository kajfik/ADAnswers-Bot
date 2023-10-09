import App from "./App.vue";
import { createApp } from "vue";

window.selectedCommand = document.URL.split("#")[1];

createApp(App).mount("#app");