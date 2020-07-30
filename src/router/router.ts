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
        path: RouteUri.PageSub1,
        component: loadable(() => import('@/pages/page1/page1-sub1')),
        exact: true,
        name: 'page sub1',
    },
    {
        path: RouteUri.PageSub2,
        component: loadable(() => import('@/pages/page1/page1-sub2')),
        exact: true,
        name: 'page sub2',
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
