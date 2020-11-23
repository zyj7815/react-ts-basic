import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Avatar } from 'antd'
import { ServerRequest } from '@/server/request'
import { animalProfile } from '@/assets/images'
import { ServiceTool } from '@/utils/service-tool'
import { AweColumnProps } from '@/types'
import { AnimalProps } from '@/types/common'

export const animalColumns = (events: AweColumnProps<AnimalProps>, hiddenOption: boolean) => {
    const columns: any[] = [
        {
            title: useLanguage.animal_nickname,
            dataIndex: 'nickname',
            width: 250,
            render(nickname: string, record: AnimalProps) {
                return (
                    <span
                        className="awe-action-item"
                        onClick={() =>
                            events.onCheckDetailEvent && events.onCheckDetailEvent(record)
                        }
                    >
                        {nickname}
                    </span>
                )
            },
        },
        {
            title: useLanguage.species,
            dataIndex: 'species',
            width: 120,
            render(species: number) {
                return ServiceTool.getSpecies(species)
            },
        },
        {
            title: useLanguage.group,
            dataIndex: 'room_name',
            width: 150,
            render(room_name: string) {
                return room_name || '-'
            },
        },
        {
            title: useLanguage.latest_gprs_time,
            dataIndex: 'updated_at',
            render(updated_at: number, record: any) {
                return record.device_id ? ServiceTool.getDeviceUpdated(record) : '-'
            },
        },
    ]

    const action = {
        title: useLanguage.action,
        dataIndex: 'operation',
        fixed: 'right' as 'right',
        width: (window as any).isEn ? 170 : 100,
        render(operation: string, record: any) {
            return (
                <div className="awe-action-box">
                    {record.device_id ? (
                        <span>{useLanguage.view_location}</span>
                    ) : (
                        <span>{useLanguage.bound_device}</span>
                    )}
                </div>
            )
        },
    }

    if (!hiddenOption) {
        columns.push(action)
    }

    return columns
}
