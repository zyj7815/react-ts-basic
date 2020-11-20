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
                        path: RouteUris.PastureDetail(),
                        component: loadable(() => import('@/pages/pasture-wrapper/pasture')),
                        name: 'pasture-wrapper-detail',
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
                    {
                        path: RouteUris.PastureFenceAddBiological(),
                        component: loadable(() =>
                            import('@/pages/pasture-wrapper/fence/add-biological')
                        ),
                        name: 'pasture-wrapper-fence',
                        exact: true,
                    },
                    {
                        path: RouteUris.PastureDevice(),
                        component: loadable(() => import('@/pages/pasture-wrapper/device')),
                        name: 'pasture-wrapper-device',
                        exact: true,
                    },
                    {
                        path: RouteUris.PastureAbnormal(),
                        component: loadable(() => import('@/pages/pasture-wrapper/abnormal')),
                        name: 'pasture-wrapper-abnormal',
                        exact: true,
                    },
                    {
                        path: RouteUris.PastureMapDetail(),
                        component: loadable(() => import('@/pages/pasture-wrapper/map')),
                        name: 'pasture-wrapper-map',
                        exact: true,
                    },
                    {
                        path: RouteUris.PastureMessage(),
                        component: loadable(() => import('@/pages/pasture-wrapper/message')),
                        name: 'pasture-wrapper-message',
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
                        path: RouteUris.MainPastureEdit(),
                        component: loadable(() => import('@/pages/main-wrapper/pasture/edit')),
                        name: 'main-wrapper-pasture-edit',
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
                        path: RouteUris.MainDeviceAllocation,
                        component: loadable(() => import('@/pages/main-wrapper/device/allocation')),
                        name: 'main-wrapper-device-allocation',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainAccount,
                        component: loadable(() => import('@/pages/main-wrapper/account')),
                        name: 'main-wrapper-account',
                        exact: true,
                    },
                    {
                        path: RouteUris.EditAccount,
                        component: loadable(() =>
                            import('@/pages/main-wrapper/account/account-edit')
                        ),
                        name: 'main-wrapper-account',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainCompany,
                        component: loadable(() => import('@/pages/main-wrapper/company')),
                        name: 'main-wrapper-company',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainPastureMap,
                        component: loadable(() => import('@/pages/main-wrapper/map')),
                        name: 'main-wrapper-map',
                        exact: true,
                    },
                    {
                        path: RouteUris.CompanyEdit,
                        component: loadable(() =>
                            import('@/pages/main-wrapper/company/company-edit')
                        ),
                        name: 'main-wrapper-company',
                        exact: true,
                    },
                    {
                        path: RouteUris.MainKey,
                        component: loadable(() => import('@/pages/main-wrapper/secret/secret')),
                        name: 'main-wrapper-key',
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
