import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { GroupProps } from '@/types/common'
import { AweColumnProps } from '@/types'
import { PlusCircleOutlined } from '@ant-design/icons'

export const groupColumns = (events: AweColumnProps<GroupProps>) => {
    return [
        {
            title: useLanguage.nickname,
            dataIndex: 'room_name',
            width: 220,
            render(name: any, record: GroupProps) {
                return (
                    <span
                        onClick={() =>
                            events.onCheckDetailEvent && events.onCheckDetailEvent(record)
                        }
                        className={'group-name'}
                    >
                        {name}
                    </span>
                )
            },
        },
        {
            title: useLanguage.animal_status,
            dataIndex: 'updated_at',
            width: 220,
            render(updated_at: string) {
                return (
                    <div className={'bio-status'}>
                        <div className={'bio-status-box'}>{useLanguage.estrus}</div>
                        <div className={'bio-status-box'}>{useLanguage.estrus}</div>
                    </div>
                )
            },
        },
        {
            title: useLanguage.abnormal_num,
            dataIndex: 'total_biological',
            width: 100,
        },
        {
            title: useLanguage.species,
            dataIndex: 'total_biological',
            width: 100,
        },
        {
            title: useLanguage.gender,
            dataIndex: 'total_biological',
            width: 100,
        },
        {
            title: useLanguage.age,
            dataIndex: 'total_biological',
            width: 100,
        },
        {
            title: useLanguage.deploy_status,
            dataIndex: 'total_area',
            width: 170,
            render(total_area: number) {
                return (
                    <div className={'deploy-status'}>
                        {total_area === 0 ? <PlusCircleOutlined /> : total_area}
                    </div>
                )
            },
        },
        {
            title: useLanguage.remark,
            dataIndex: 'description',
            width: 220,
        },
    ]
}
