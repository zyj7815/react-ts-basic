import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { PastureProps } from '@/types/common'
import { AweColumnProps } from '@/types'
import { Button } from 'antd'

export const pastureColumns = (events: AweColumnProps<PastureProps>) => {
    return [
        {
            title: useLanguage.pasture_name,
            dataIndex: 'nickname',
            render(name: string, record: PastureProps) {
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
            title: useLanguage.type,
            dataIndex: 'type',
        },
        {
            title: useLanguage.created_date,
            dataIndex: 'created_at',
        },
        {
            title: useLanguage.current_archived,
            dataIndex: 'animal',
        },
        {
            title: useLanguage.device_num,
            dataIndex: 'number',
        },
        {
            title: useLanguage.waiting_event_num,
            dataIndex: 'event',
        },
        {
            title: '',
            dataIndex: 'id',
            width: 190,
            render(id: string, record: PastureProps) {
                return events.currentId === id ? (
                    <Button
                        className="awe-primary-btn"
                        onClick={() => events.onEditEvent && events.onEditEvent(record)}
                    >
                        {useLanguage.edit}
                    </Button>
                ) : (
                    ''
                )
            },
        },
    ]
}
