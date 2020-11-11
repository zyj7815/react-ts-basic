import loadable from '@loadable/component'
import { RouteInterface } from '@/types/route'
import { RouteUris } from '@/router/config'

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
                path: RouteUris.PastureWrapper(),
                component: loadable(() => import('@/pages/pasture-wrapper')),
                name: 'pasture-wrapper',
                routes: [
                    {
                        path: RouteUris.PastureOverview(),
                        component: loadable(() => import('@/pages/pasture-wrapper/overview')),
                        name: 'pasture-wrapper-overview',
                    },
                    {
                        path: RouteUris.PastureAnimal(),
                        component: loadable(() => import('@/pages/pasture-wrapper/animal')),
                        name: 'pasture-wrapper-animal',
                        exact: true,
                    },
                    {
                        path: RouteUris.PastureAnimalNew(),
                        component: loadable(() =>
                            import('@/pages/pasture-wrapper/animal/new-animal')
                        ),
                        name: 'pasture-wrapper-animal-new',
                        exact: true,
                    },
                    {
                        path: RouteUris.PastureGroup(),
                        component: loadable(() => import('@/pages/pasture-wrapper/group')),
                        name: 'pasture-wrapper-group',
                        exact: true,
                    },
                    {
                        path: RouteUris.PastureGroupDetail(),
                        component: loadable(() => import('@/pages/pasture-wrapper/group/detail')),
                        name: 'pasture-wrapper-group-detail',
                        exact: true,
                    },
                    {
                        path: RouteUris.PastureGroupEdit(),
                        component: loadable(() => import('@/pages/pasture-wrapper/group/edit')),
                        name: 'pasture-wrapper-group-edit',
                        exact: true,
                    },
                    {
                        path: RouteUris.PastureFence(),
                        component: loadable(() => import('@/pages/pasture-wrapper/fence')),
                        name: 'pasture-wrapper-fence',
                        exact: true,
                    },
                ],
            },
            {
                path: RouteUris.MainWrapper,
                component: loadable(() => import('@/pages/main-wrapper')),
                name: 'main-wrapper',
                routes: [
                    {
                        path: RouteUris.MainWrapper,
                        component: loadable(() => import('@/pages/main-wrapper/pasture')),
                        name: 'main-wrapper-pasture',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainPasture,
                        component: loadable(() => import('@/pages/main-wrapper/pasture')),
                        name: 'main-wrapper-pasture',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainPastureNew,
                        component: loadable(() => import('@/pages/main-wrapper/pasture/new')),
                        name: 'main-wrapper-pasture-new',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainDevice,
                        component: loadable(() => import('@/pages/main-wrapper/device')),
                        name: 'main-wrapper-device',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainDeviceDetail(),
                        component: loadable(() => import('@/pages/main-wrapper/device/detail')),
                        name: 'main-wrapper-device-detail',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainAccount,
                        component: loadable(() => import('@/pages/main-wrapper/account')),
                        name: 'main-wrapper-account',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainCompany,
                        component: loadable(() => import('@/pages/main-wrapper/company')),
                        name: 'main-wrapper-company',
                        exact: true,
                    },
                ],
            },
        ],
    },
    {
        path: RouteUris.NotFound,
        component: loadable(() => import('@/pages/status-wrapper/404')),
        name: '404',
    },
]
