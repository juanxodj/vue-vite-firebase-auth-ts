import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import i18n from '@/i18n';

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VueSweetalert2)
app.use(i18n)

app.mount('#app');
