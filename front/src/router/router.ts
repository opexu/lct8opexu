import { createRouter, createWebHistory } from 'vue-router'
import { isAuhenticated } from '@/scripts/common/authorization';

declare module 'vue-router'{
    interface RouteMeta {
        transition: string;
    }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
        {
            path: '/:catchAll(.*)',
            redirect: 'Login',
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue'),
            props: true,
            meta: { transition: 'fade' },
            beforeEnter: async ( to, from ) => {
                console.log('beforeEnter Login');
            },
        },
        {
            path: '/main',
            name: 'Main',
            component: () => import('@/views/Main.vue'),
            props: true,
            meta: { transition: 'fade' },
            beforeEnter: async () => {
                console.log('beforeEnter Main');
            }
        },
    ]
})

router.beforeEach( async ( to, from, next ) => {

    const authResult = await isAuhenticated();
    
    if( !authResult.isAuth && to.name !== 'Login' ) next({ name: 'Login' });
    else {
        next();
    }
});

export default router
