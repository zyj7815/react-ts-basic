import loadable from '@loadable/component'
import { RouteInterface } from '@/types/route'

// TODO: public路径从buildConfig里读取，注入环境变量使用
export const basename = ''

export const routes: RouteInterface[] = [
    {
        path: '/login',
        exact: true,
        component: loadable(() => import('@/pages/login')),
        name: 'login',
    },
    {
        path: '/',
        exact: true,
        component: loadable(() => import('@/pages/layout')),
        name: 'layout',
    },
    {
        path: '/main',
        exact: true,
        component: loadable(() => import('@/pages/demo/HelloWorldDemo')),
        name: 'home',
    },
    {
        path: '/home',
        component: loadable(() => import('@/pages/demo/HelloWorldDemo')),
        exact: true,
        name: 'home',
        auth: true,
    },
    // 404 Not Found
    {
        path: '*',
        component: loadable(() => import('@/pages/status/404')),
        name: '404',
    },
]
