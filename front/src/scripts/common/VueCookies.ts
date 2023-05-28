import type { ICookie } from "./ICookie";
import type { VueCookies } from "vue-cookies";

declare global {
    interface Window { $cookies: VueCookies }
}

const COOKIE: ICookie = {
    user: "lct-user",
    jwt: "lct-jwt",
}

export {
    COOKIE
}