import { inject } from "vue";
import type { VueCookies } from "vue-cookies";

export function useCookies(){
    const $cookies = inject<VueCookies>('$cookies');
    return { $cookies }
}