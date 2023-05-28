<template>
<div class="w-full h-full flex justify-center items-center">
    <div class="w-fit min-w-[30%] h-fit flex flex-col space-y-4">
        
        <!-- HEADER TEXT -->
        <div class="w-full h-full flex flex-row justify-center">
            <p class="text-lg">Авторизация</p>
        </div>

        <!-- BODY TEXT -->
        <form>
        <div class="w-full h-fit flex flex-col space-y-4">
            
            <!-- ЛОГИН -->
            <div class="w-full h-fit flex flex-col">
                <label for="login" class="w-full h-fit">Логин</label>
                <input id="login" type="text" autocomplete="new-login"
                class="w-full h-fit p-4 border rounded-md"
                v-model="login"
                />
            </div>

            <!-- ПАРОЛЬ -->
            <div class="w-full h-fit flex flex-col">
                <label for="password" class="w-full h-fit">Пароль</label>
                <input id="password" type="password" autocomplete="new-password"
                class="w-full h-fit p-4 border rounded-md"
                v-model="password"
                />
            </div>
        </div>
        </form>

        <!-- FOOTER TEXT-->
        <div class="w-full h-fit flex">
            <button type="button" class="w-full h-fit p-4 border rounded-md common-handler-btn-blue" 
            @click="submitLogin"
            >
                Войти
            </button>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { LCTRequest } from '@/_api/Request';
import type { IStrapiUser } from '@/scripts/common/IAuth';
import { COOKIE } from '@/scripts/common/VueCookies';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCookies } from '@/composables/useCookies';
import { POST_ROUTES } from '@/_api/POST/PostRoutes';

const { $cookies } = useCookies();
const router = useRouter();
const route = useRoute();

const login = ref();
const password = ref();
const isAuthError = ref();

async function submitLogin(){
    console.log('login: ', login.value);
    console.log('password: ', password.value);

    try{
        isAuthError.value ? false : true;

        $cookies?.remove( COOKIE.user );
        $cookies?.remove( COOKIE.jwt );
        const payload = JSON.stringify({ identifier: login.value, password: password.value });
        const loginResponse = await LCTRequest.POST<IStrapiUser, BodyInit>( POST_ROUTES.auth, payload );
        console.log('loginResponse', loginResponse);
        $cookies?.set( COOKIE.user, loginResponse.user );
        $cookies?.set( COOKIE.jwt, loginResponse.jwt );
        
        router.push({
            name: 'Main',
            // query: {
            //     ...route.query,
            // }
        })
    }catch(e){
        console.warn('Ошибка авторизации, попробуйте изменить логин или пароль', e);
        isAuthError.value = true;
    }
}
</script>