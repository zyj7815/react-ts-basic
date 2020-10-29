import { RouteUris } from '@/router/config'
import { IMenuNav } from '@/types/route'
import { aweIconType } from '@/assets/iconfont'

export const mainMenuNav: IMenuNav[] = [
    {
        title: '牧场管理',
        uri: RouteUris.MainWrapper,
        level: 1,
    },
    {
        title: '设备管理',
        uri: RouteUris.MainDevice,
        level: 1,
    },
]
