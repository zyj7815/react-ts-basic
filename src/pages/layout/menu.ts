import { RouteUri } from '@/router/config'

export interface IMenuNav {
    title: string
    uri?: RouteUri | string
    children?: IMenuNav[]
}

export const menuNav: IMenuNav[] = [
    {
        title: '首页',
        uri: RouteUri.Home,
    },
    {
        title: 'Page1',
        children: [
            {
                title: 'Todo hook',
                uri: RouteUri.PageSub1,
            },
            {
                title: 'Todo class',
                uri: RouteUri.PageSub2,
            },
            {
                title: 'useContext',
                uri: RouteUri.PageSub3,
            },
            {
                title: 'useReducer',
                uri: RouteUri.PageSub4,
            },
        ],
    },
]
