import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { PastureProps } from '@/types/common'

type PastureColumnsProps = {
    onCheckPasture: (pasture: PastureProps) => void
}

export const pastureColumns = (events: PastureColumnsProps) => {
    return [
        {
            title: useLanguage.pasture_name,
            dataIndex: 'nickname',
            render(name: string, record: PastureProps) {
                return (
                    <span className="awe-action-item" onClick={() => events.onCheckPasture(record)}>
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
            title: useLanguage.operation,
            dataIndex: 'operation',
        },
    ]
}
