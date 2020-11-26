import { singleIcon } from '@/assets/images/signal'
import { batteryIcons } from '@/assets/images/battery'
import { useLanguage } from '@/language/useLanguage'
import { Helper } from '@/helper'
import { AnimalProps } from '@/model'
import { AbnormalType, BindingStatus, GenderType, MessageType } from '@/enum'
import { _URL_DEFAULT_PAGE_SIZE_, _URL_PAGE_NUMBER_, _URL_PAGE_SIZE_ } from '@/types/url'
import { rootStore } from '@/provider'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

/**
 * 业务相关的事务
 */
export const ServiceTip = {
    /**
     * 获取性别
     */
    getGender(gender: GenderType) {
        switch (gender) {
            case GenderType.Male:
                return useLanguage.male
            case GenderType.Female:
                return useLanguage.female
            default:
                return useLanguage.unknown
        }
    },

    /**
     * 获取设备的信号图标
     * @param device
     */
    getSignalIcon(device: any) {
        const signal: number = device.signal_strength
        if (signal) {
            if (signal < 0) {
                return singleIcon.bt
            }
            if (signal < 7.1) {
                return singleIcon.l1
            }
            if (signal < 15.1) {
                return singleIcon.l2
            }
            if (signal < 23.1) {
                return singleIcon.l3
            } else {
                return singleIcon.l4
            }
        } else {
            return singleIcon.l1
        }
    },

    /**
     * 获取设备电量图标
     * @param device
     */
    getBatteryIcon(device: any) {
        const battery = device.battery_voltage

        if (battery || battery === 0) {
            if (battery >= 4.05) {
                return batteryIcons.l3
            } else if (battery < 3.6) {
                return batteryIcons.l0
            } else if (battery < 3.75) {
                return batteryIcons.l1
            } else if (battery < 3.9) {
                return batteryIcons.l2
            } else if (battery < 4.05) {
                return batteryIcons.blue
            }
        } else {
            return batteryIcons.gray
        }
    },

    /**
     * 获取生物种类
     * @param speciesCode
     */
    getSpecies(speciesCode: number): string {
        switch (speciesCode) {
            case 100:
                return useLanguage.bovine
            case 101:
                return useLanguage.ovis
            case 102:
                return useLanguage.swine
            case 103:
                return useLanguage.horse
            case 104:
                return useLanguage.camel
            case 105:
                return useLanguage.donkey
            default:
                return useLanguage.other
        }
    },

    /**
     * 获取生物的年龄
     * @param beh_time
     */

    getAge(beh_time: string): any {
        if (beh_time) {
            const then = dayjs(beh_time)
            const now = dayjs(Date.now())
            const years = dayjs(now, 'DD/MM/YYYY HH:mm:ss').diff(
                dayjs(then, 'DD/MM/YYYY HH:mm:ss').utc(),
                'year'
            )

            if (years === 0) {
                return `0 ${useLanguage.year_old}`
            }
            return `${years} ${useLanguage.years_old}`
        } else {
            return '-'
        }
    },

    /**
     * 获取生物的设备更新时间
     * @param animal
     */
    getDeviceUpdated(animal: any): string {
        if (!animal.status_device) {
            return '-'
        } else {
            return Helper.utc2Time(animal.status_device.updated_at)
        }
    },

    /**
     * 从url中获取翻页相关的参数
     */
    getPageFromUrl() {
        let { pageNumber, pageSize } = Helper.getUrlMultiParam([_URL_PAGE_SIZE_, _URL_PAGE_NUMBER_])
        // 没有值就取默认参数
        pageSize = Helper.hasExist(pageSize) ? parseInt(pageSize, 10) : _URL_DEFAULT_PAGE_SIZE_
        pageNumber = Helper.hasExist(pageNumber) ? parseInt(pageNumber, 10) : 1

        return {
            pageNumber,
            pageSize,
        }
    },

    /**
     * 获取生物绑定设备状态
     */
    getBindingStatus(animal: AnimalProps) {
        if (animal.devices_binding && animal.devices_binding.length) {
            // 已解绑的
            if (animal.devices_binding[animal.devices_binding.length - 1].end_time) {
                return BindingStatus.Deployed
            }
            // 绑定中的
            return BindingStatus.Deploying
        } else {
            // 未绑定的
            return BindingStatus.Undeploy
        }
    },

    /**
     * 异常状态
     * @param type
     */
    getAbnormalEvent(type: AbnormalType) {
        switch (type) {
            case AbnormalType.AbnormalActivity:
                return useLanguage.activity_abnormal
            case AbnormalType.AbnormalEating:
                return useLanguage.eating_abnormal
            case AbnormalType.AbnormalRuminate:
                return useLanguage.ruminate_abnormal
            default:
                return useLanguage.activity_abnormal
        }
    },

    /**
     * 消息通知类型
     * @param type
     */
    getMsgType(type: MessageType) {
        switch (type) {
            case MessageType.AnimalInfo:
                return useLanguage.animal_info
            case MessageType.DeviceInfo:
                return useLanguage.device_info
            case MessageType.FenceInfo:
                return useLanguage.fence_info
            default:
                return useLanguage.other
        }
    },

    /**
     * 获取设备类型
     */
    getDeviceType(type: number) {
        let name: string = useLanguage.unknown_type

        for (const deviceType of rootStore.device_type_list) {
            if (deviceType.device_type === type) {
                name = deviceType.name
                break
            }
        }

        return name
    },
}
