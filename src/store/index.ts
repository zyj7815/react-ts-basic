import { action, observable } from 'mobx'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { AweGlobal } from '@/global'
import { DeviceTypeProps, MySelfProps } from '@/model'

const initMyself: MySelfProps = {
    id: '',
    name: '',
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
    @observable myself: MySelfProps = initMyself
    @observable resources: string[] = []
    @observable theme: any = null
    @observable device_type_list: DeviceTypeProps[] = []

    @action.bound getBasicData() {
        return new Promise((resolve, reject) => {
            this.getMyself()
                .then(() => {
                    return this.getDeviceType()
                })
                .then(() => {
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * 获取myself的数据
     */
    @action.bound getMyself() {
        return new Promise((resolve, reject) => {
            axios
                .get(Api.myself, Token.data)
                .then(myself => {
                    // 设置时区
                    AweGlobal.setTimeZone(myself.data.profile.time_zone)

                    // myself 赋值
                    this.myself = myself.data

                    resolve(myself.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * 获取设备类型
     */
    @action.bound getDeviceType() {
        return new Promise((resolve, reject) => {
            axios
                .get(Api.device.device_type, Token.pageToken(999))
                .then(res => {
                    this.device_type_list = res.data
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /**
     * 设置个人参数
     */
    @action.bound setMyself(data: MySelfProps) {
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
