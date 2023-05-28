import './main.css';

import App from '@/App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueCookies from 'vue-cookies';
import router from './router/router';

const app = createApp( App );

const pinia = createPinia();

app.use( VueCookies, { expires: '7d' } );
app.use( pinia );
app.use( router );
app.mount( '#app' );

export {};
