import { RouteUris } from '@/router/config'
import { IMenuNav } from '@/types/route'
import { useLanguage } from '@/language/useLanguage'
import { aweIconType } from '@/assets/iconfont'

export const pastureMenuNav = (id: string): IMenuNav[] => [
    {
        title: useLanguage.homepage,
        uri: RouteUris.PastureOverview(id),
        icon: aweIconType['icon-biological'],
        level: 1,
    },
    {
        title: useLanguage.pasture_management,
        uri: RouteUris.PastureDetail(id),
        icon: aweIconType['icon-biological'],
        level: 1,
    },
    {
        title: useLanguage.animal,
        uri: RouteUris.PastureAnimalManager(id),
        icon: aweIconType['icon-biological'],
        level: 1,
        children: [
            {
                title: useLanguage.animal_overview,
                uri: RouteUris.PastureAnimalOverview(id),
                level: 2,
            },
            {
                title: useLanguage.animal_list,
                uri: RouteUris.PastureAnimalList(id),
                level: 2,
            },
            {
                title: useLanguage.animal_inventory,
                uri: RouteUris.PastureAnimalInventory(id),
                level: 2,
            },
        ],
    },
    {
        title: useLanguage.group_management,
        uri: RouteUris.PastureGroup(id),
        icon: aweIconType['icon-group_empty'],
        level: 1,
    },
    {
        title: useLanguage.device_manage,
        uri: RouteUris.PastureDevice(id),
        icon: aweIconType['icon-device'],
        level: 1,
    },
    {
        title: useLanguage.abnormal_event,
        uri: RouteUris.PastureAbnormal(id),
        icon: aweIconType['icon-device'],
        level: 1,
    },
    {
        title: useLanguage.fence_management,
        uri: RouteUris.PastureFence(id),
        icon: aweIconType['icon-geofence'],
        level: 1,
    },
    {
        title: useLanguage.message_notification,
        uri: RouteUris.PastureMessage(id),
        icon: aweIconType['icon-geofence'],
        level: 1,
    },
]
