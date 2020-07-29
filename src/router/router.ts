import loadable from '@loadable/component'
import { RouteInterface } from '@/types/route'
import { RouteUri } from '@/router/config'

// TODO: public路径从buildConfig里读取，注入环境变量使用
export const basename = ''

export const routes: RouteInterface[] = [
    {
        path: RouteUri.Home,
        component: loadable(() => import('@/pages/home')),
        exact: true,
        name: 'home',
        auth: true,
    },
    {
        path: RouteUri.NotFound,
        component: loadable(() => import('@/pages/status/404')),
        name: '404',
    },
    {
        path: RouteUri.NotAuth,
        component: loadable(() => import('@/pages/status/no-auth')),
        name: 'auth',
    },
]
