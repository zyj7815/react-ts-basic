import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { ServiceTool } from '@/utils/service-tool'
import { AweColumnProps } from '@/types'
import { AnimalProps } from '@/types/common'
import { PlusCircleOutlined } from '@ant-design/icons'

interface AnimalColumnProps extends AweColumnProps<AnimalProps> {
    onCheckAbnormal: (record: AnimalProps) => void
    onCheckGroup: (record: AnimalProps) => void
    onCheckDevice: (record: AnimalProps) => void
}

export const animalColumns = (events: AnimalColumnProps) => {
    return [
        {
            title: useLanguage.animal_nickname,
            dataIndex: 'nickname',
            width: 150,
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
            title: useLanguage.animal_status,
            dataIndex: 'status',
            width: 140,
            render(status: any, record: AnimalProps) {
                return (
                    <span className="awe-border-box">
                        <span>发情</span>
                        <span>生病</span>
                    </span>
                )
            },
        },
        {
            title: useLanguage.abnormal_num,
            dataIndex: 'abnormal',
            width: 100,
            render(abnormal: number, record: AnimalProps): any {
                return (
                    <span
                        className="awe-action-item"
                        onClick={() => events.onCheckAbnormal(record)}
                    >
                        12
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
            title: useLanguage.gender,
            dataIndex: 'gender',
            width: 120,
            render: (gender: number) => ServiceTool.getGender(gender),
        },
        {
            title: useLanguage.belong_group,
            dataIndex: 'room_name',
            width: 150,
            render(room_name: string, record: AnimalProps) {
                return room_name ? (
                    <span className="awe-action-item" onClick={() => events.onCheckGroup(record)}>
                        {room_name}
                    </span>
                ) : (
                    '-'
                )
            },
        },
        {
            title: useLanguage.deploy_status,
            dataIndex: 'mark',
            width: 100,
            render(mark: string, record: AnimalProps) {
                return (
                    <span className="awe-action-item" onClick={() => events.onCheckDevice(record)}>
                        {mark || <PlusCircleOutlined />}
                    </span>
                )
            },
        },
    ]
}
