import { action, observable } from 'mobx'

declare const RoleTypes: ['user', 'admin']
declare type RoleType = typeof RoleTypes[number]

interface Profile {
    language: number
    page_size: number
    time_zone: number
}

export interface MySelf {
    id: string
    username: string
    company_name: string
    company_id: string
    role: RoleType
    profile: Profile
}

const initMyself: MySelf = {
    id: '',
    username: '',
    role: 'user',
    company_id: '',
    company_name: '',
    profile: {
        language: 1,
        page_size: 10,
        time_zone: 0,
    },
}

export class RootStore {
    @observable myself: MySelf = initMyself
    @observable resources: string[] = []
    @observable theme: any = null

    /**
     * 设置个人参数
     */
    @action.bound setMyself(data: MySelf) {
        this.myself = data
    }

    @action.bound setResources(resource: string[]) {
        this.resources = resource
    }

    @action.bound setTheme(theme: any) {
        this.theme = theme
    }
}

export const STORE_ROOT = 'rootStore'
