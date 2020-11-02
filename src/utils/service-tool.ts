import { singleIcon } from '@/assets/images/signal'
import { batteryIcons } from '@/assets/images/battery'
import { useLanguage } from '@/language/useLanguage'
import dayjs from 'dayjs'
import { Utils } from '@/utils/index'
import { urlParams } from '@/types/url'
dayjs.extend(require('dayjs/plugin/utc'))

/**
 * 业务相关的事务
 */
export const ServiceTool = {
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
     * 获取生物的设备更新时间
     * @param animal
     */
    getDeviceUpdated(animal: any): string {
        if (!animal.status_device) {
            return '-'
        } else {
            return this.utc2Time(animal.status_device.updated_at)
        }
    },

    /**
     * utc时间转当地时区
     * @param dateTime
     * @param format
     */
    utc2Time(dateTime: string, format = 'YYYY-MM-DD HH:mm:ss'): string {
        return (
            dayjs(dateTime)
                //@ts-ignore
                .utc()
                .add((window as any).timeZone, 'm')
                .format(format)
        )
    },

    /**
     * 从url中获取翻页相关的参数
     */
    getPageFromUrl() {
        let { pageNumber, pageSize } = Utils.getUrlMultiParam([
            urlParams.pageNumber,
            urlParams.pageSize,
        ])
        // 没有值就取默认参数
        pageSize = Utils.hasExist(pageSize) ? parseInt(pageSize, 10) : urlParams.defaultPageSize
        pageNumber = Utils.hasExist(pageNumber) ? parseInt(pageNumber, 10) : 1

        return {
            pageNumber,
            pageSize,
        }
    },
}
