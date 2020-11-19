import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { DeviceProps } from '@/types/common'
import { Utils } from '@/utils'
import { AweColumnProps } from '@/types'
import { ServiceTool } from '@/utils/service-tool'

export const deviceColumns = (events: AweColumnProps<any>) => {
    return [
        {
            title: useLanguage.sn,
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
            render(device_type: number) {
                return ServiceTool.getDeviceType(device_type)
            },
        },
        {
            title: useLanguage.latest_gprs_time,
            dataIndex: 'updated_at',
            width: 190,
            render(updated_at: string): any {
                return Utils.utc2Time(updated_at)
            },
        },
        {
            title: useLanguage.battery_power,
            dataIndex: 'battery',
        },
        {
            title: useLanguage.temperature,
            dataIndex: 'temperature',
        },
        {
            title: useLanguage.animal_nickname,
            dataIndex: 'pasture',
        },
    ]
}
