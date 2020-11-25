import { RouteUris } from '@/router/config'
import { IMenuNav } from '@/types/route'
import { useLanguage } from '@/language/useLanguage'
import { aweIconType } from '@/assets/iconfont'

export const animalMenuNav = (animalId: string, pastureId: string): IMenuNav[] => {
    return [
        {
            title: useLanguage.animal_detail,
            uri: RouteUris.AnimalDetail(animalId, pastureId),
            icon: aweIconType['icon-geofence'],
            level: 1,
        },
        {
            title: useLanguage.animal_device,
            uri: RouteUris.AnimalDevice(animalId, pastureId),
            icon: aweIconType['icon-device'],
            level: 1,
        },
        {
            title: useLanguage.animal_record,
            uri: RouteUris.AnimalRecord(animalId, pastureId),
            icon: aweIconType['icon-device'],
            level: 1,
        },
    ]
}
