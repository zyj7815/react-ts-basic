import { RouteComponentProps } from 'react-router-dom'

export interface RouteInterface {
    path: string
    component: any
    routes?: RouteInterface[]
    exact?: boolean
    title?: string
    name?: string
    auth?: boolean // 权限判断
}

export interface RoutesInterface {
    routes?: RouteInterface[]
}

export interface IMenuNav {
    title: string // 菜单标题
    level: number // 菜单等级
    icon?: any // 图标
    uri?: string // 路由
    children?: IMenuNav[] // 子菜单
}

export type RouteProps = RouteComponentProps<any> & RoutesInterface
