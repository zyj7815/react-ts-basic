import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { GroupProps } from '@/types/common'
import { AweColumnProps } from '@/types'
import { PlusCircleOutlined } from '@ant-design/icons'

export const groupColumns = (events: AweColumnProps<GroupProps>) => {
    return [
        {
            title: useLanguage.nickname,
            dataIndex: 'nickname',
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
            dataIndex: 'species',
            width: 100,
        },
        {
            title: useLanguage.gender,
            dataIndex: 'gender',
            width: 100,
        },
        {
            title: useLanguage.age,
            dataIndex: 'age',
            width: 100,
        },
        {
            title: useLanguage.deploy_status,
            dataIndex: 'mark',
            width: 170,
            render(mark: number) {
                return <div>{mark}</div>
            },
        },
        {
            title: useLanguage.remark,
            dataIndex: 'description',
            width: 220,
        },
    ]
}
