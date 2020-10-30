import { RouteUris } from '@/router/config'
import { IMenuNav } from '@/types/route'
import { useLanguage } from '@/language/useLanguage'
import { aweIconType } from '@/assets/iconfont'

export const pastureMenuNav = (id: string): IMenuNav[] => [
    {
        title: useLanguage.animal,
        uri: RouteUris.PastureAnimal(id),
        icon: aweIconType['icon-biological'],
        level: 1,
    },
    {
        title: useLanguage.group_management,
        uri: RouteUris.PastureGroup(id),
        icon: aweIconType['icon-group_empty'],
        level: 1,
    },
    {
        title: useLanguage.fence_management,
        uri: RouteUris.PastureFence(id),
        icon: aweIconType['icon-geofence'],
        level: 1,
    },
]
