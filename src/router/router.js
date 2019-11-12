import VueRouter from 'vue-router'
import vue from 'vue';
import home from '@/components/home';
import blog from '@/components/blog';
import game from '@/components/game/game-home'

vue.use(VueRouter)

const routes = [{
        path: '/home',
        component: home
    }, {
        path: '/blog',
        component: blog
    }, {
        path: '/game',
        component: game
    }],
    router = new VueRouter({
        routes
    })


export default router