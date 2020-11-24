import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Helper } from '@/helper'
import { GroupProps } from '@/model'
import { AweColumnProps } from '@/types'
import { Button } from 'antd'

export const groupColumns = (events: AweColumnProps<GroupProps>) => {
    return [
        {
            title: useLanguage.group_name,
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
            title: useLanguage.updating_time,
            dataIndex: 'updated_at',
            width: 220,
            render(updated_at: string) {
                return Helper.utc2Time(updated_at)
            },
        },
        {
            title: useLanguage.animal_count,
            dataIndex: 'total_biological',
            width: 170,
        },
        {
            title: useLanguage.remark,
            dataIndex: 'description',
        },
        {
            title: '',
            dataIndex: 'id',
            width: 170,
            render(id: string, record: GroupProps) {
                return (
                    events.currentId === record.id && (
                        <div className="awe-btn-box">
                            <Button
                                className="awe-primary-btn"
                                onClick={() => events.onEditEvent && events.onEditEvent(record)}
                            >
                                {useLanguage.edit}
                            </Button>
                            <Button
                                danger={true}
                                onClick={() => events.onDeleteEvent && events.onDeleteEvent(record)}
                            >
                                {useLanguage.delete}
                            </Button>
                        </div>
                    )
                )
            },
        },
    ]
}
