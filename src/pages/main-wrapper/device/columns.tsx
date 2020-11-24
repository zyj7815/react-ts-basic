import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { DeviceProps } from '@/model'
import { Helper } from '@/helper'
import { AweColumnProps } from '@/types'
import { ServiceTip } from '@/service'

export const deviceColumns = (events: AweColumnProps<any>) => {
    return [
        {
            title: useLanguage.sn,
            dataIndex: 'sn',
            width: 160,
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
            width: 210,
            ellipsis: true,
            render(device_type: number) {
                return ServiceTip.getDeviceType(device_type)
            },
        },
        {
            title: useLanguage.latest_gprs_time,
            dataIndex: 'updated_at',
            width: 210,
            render(updated_at: string): any {
                return Helper.utc2Time(updated_at)
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
            title: useLanguage.belong_pasture,
            dataIndex: 'pasture',
        },
    ]
}
