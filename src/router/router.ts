import loadable from '@loadable/component'
import { RouteInterface } from '@/types/route'
import { RouteUri, RouteUris } from '@/router/config'

export const routes: RouteInterface[] = [
    {
        path: RouteUris.Login,
        component: loadable(() => import('@/pages/login')),
        exact: true,
        name: 'login',
    },
    {
        path: RouteUris.Root,
        component: loadable(() => import('@/pages/root')),
        name: 'root',
        routes: [
            {
                path: RouteUris.MainWrapper,
                component: loadable(() => import('@/pages/main-wrapper')),
                name: 'main-wrapper',
                routes: [
                    {
                        path: RouteUris.MainPasture,
                        component: loadable(() => import('@/pages/main-wrapper/pasture')),
                        name: 'main-wrapper-pasture',
                    },
                    {
                        path: RouteUris.MainDevice,
                        component: loadable(() => import('@/pages/main-wrapper/device')),
                        name: 'main-wraper-device',
                    },
                ],
            },
        ],
    },
    {
        path: RouteUri.NotFound,
        component: loadable(() => import('@/pages/status-wrapper/404')),
        name: '404',
    },
]
