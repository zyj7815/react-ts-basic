import { RouteUri } from '@/router/config'

export const MenuNav = [
    {
        title: '首页',
        uri: RouteUri.Home,
    },
    {
        title: 'Page1',
        children: [
            {
                title: 'Page sub1',
                uri: RouteUri.PageSub1,
            },
            {
                title: 'Page sub2',
                uri: RouteUri.PageSub2,
            },
        ],
    },
]
