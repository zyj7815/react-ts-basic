import { RouteUris } from '@/router/config'
import { IMenuNav } from '@/types/route'
import { useLanguage } from '@/language/useLanguage'
import { aweIconType } from '@/assets/iconfont'

export const mainMenuNav: IMenuNav[] = [
    {
        title: useLanguage.pasture_management,
        uri: RouteUris.MainPasture,
        icon: aweIconType['icon-geofence'],
        level: 1,
    },
    {
        title: useLanguage.device_manage,
        uri: RouteUris.MainDevice,
        icon: aweIconType['icon-device'],
        level: 1,
    },
    {
        title: useLanguage.user_center,
        uri: RouteUris.MainAccount,
        level: 1,
    },
    {
        title: useLanguage.company,
        uri: RouteUris.MainCompany,
        level: 1,
    },
]
