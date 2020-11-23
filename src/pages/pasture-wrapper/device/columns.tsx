import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { DeviceProps } from '@/types/common'
import { Utils } from '@/utils'
import { AweColumnProps } from '@/types'
import { ServiceTool } from '@/utils/service-tool'

export const deviceColumns = (events: AweColumnProps<DeviceProps>) => {
    return [
        {
            title: 'SN',
            dataIndex: 'sn',
            render(name: number, record: DeviceProps) {
                return (
                    <span
                        className="awe-action-item"
                        onClick={() =>
                            events.onCheckDetailEvent && events.onCheckDetailEvent(record)
                        }
                    >
                        {name}
                    </span>
                )
            },
        },
        {
            title: useLanguage.device_type,
            dataIndex: 'device_type',
            ellipsis: true,
            render(deviceType: number) {
                return ServiceTool.getDeviceType(deviceType)
            },
        },
        {
            title: useLanguage.latest_gprs_time,
            dataIndex: 'updated_at',
            width: 210,
            render(updated_at: string): any {
                return Utils.utc2Time(updated_at)
            },
        },
        {
            title: useLanguage.battery_power,
            dataIndex: 'battery',
            render(battery: number, record: DeviceProps) {
                return record.status_device ? record.status_device.battery_power : '-'
            },
        },
        {
            title: useLanguage.temperature,
            dataIndex: 'temperature',
            render(temperature: number, record: DeviceProps) {
                return record.status_env ? `${record.status_env.temperature.toFixed(1)} ℃` : '-'
            },
        },
        {
            title: useLanguage.animal_nickname,
            dataIndex: 'nickname',
            width: 150,
        },
    ]
}
