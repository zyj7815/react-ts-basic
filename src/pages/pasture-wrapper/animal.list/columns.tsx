import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { ServiceTip } from '@/service'
import { AweColumnProps } from '@/types'
import { AnimalProps } from '@/model'
import { PlusCircleOutlined } from '@ant-design/icons'

interface AnimalColumnProps extends AweColumnProps<AnimalProps> {
    onCheckAbnormal?: (record: AnimalProps) => void
    onCheckGroup?: (record: AnimalProps) => void
    onCheckDevice?: (record: AnimalProps) => void
    hiddenGroup?: boolean // 隐藏分组
}

export const animalColumns = (events: AnimalColumnProps) => {
    const emptyItem = {
        title: '',
        dataIndex: '',
        width: 1,
    }

    // 所属分组
    const groupItem = {
        title: useLanguage.belong_group,
        dataIndex: 'room_name',
        width: 150,
        render(room_name: string, record: AnimalProps) {
            return room_name ? (
                <span
                    className="awe-action-item"
                    data-click={!!events.onCheckGroup}
                    onClick={() => events.onCheckGroup && events.onCheckGroup(record)}
                >
                    {room_name}
                </span>
            ) : (
                '-'
            )
        },
    }

    return [
        {
            title: useLanguage.animal_nickname,
            dataIndex: 'nickname',
            width: 150,
            render(nickname: string, record: AnimalProps) {
                return (
                    <span
                        className="awe-action-item"
                        data-click={!!events.onCheckDetailEvent}
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
                        data-click={!!events.onCheckAbnormal}
                        onClick={() => events.onCheckAbnormal && events.onCheckAbnormal(record)}
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
                return ServiceTip.getSpecies(species)
            },
        },
        {
            title: useLanguage.gender,
            dataIndex: 'gender',
            width: 120,
            render: (gender: number) => ServiceTip.getGender(gender),
        },
        events.hiddenGroup ? emptyItem : groupItem,
        {
            title: useLanguage.deploy_status,
            dataIndex: 'mark',
            width: 100,
            render(mark: string, record: AnimalProps) {
                return (
                    <span
                        className="awe-action-item"
                        data-click={!!events.onCheckDevice}
                        onClick={() => events.onCheckDevice && events.onCheckDevice(record)}
                    >
                        {mark || <PlusCircleOutlined />}
                    </span>
                )
            },
        },
    ]
}
