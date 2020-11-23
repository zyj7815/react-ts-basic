import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Button } from 'antd'
import { Utils } from '@/utils'

type keyColumnsProps = {
    currentId: string
    onCheckKey: (key: any) => void
    onCheckProcess: (key: any) => void
}

export const keyColumns = (events: keyColumnsProps) => {
    return [
        {
            title: useLanguage.bio_name,
            dataIndex: 'nickname',
            width: 150,
            render(name: number, record: any) {
                return (
                    <span className="awe-action-item" onClick={() => events.onCheckKey(record)}>
                        {name}
                    </span>
                )
            },
        },
        {
            title: useLanguage.time_of_occurrence,
            dataIndex: 'updated_at',
            width: 210,
            render(updated_at: string, record: any): any {
                return <span>{Utils.utc2Time(updated_at)}</span>
            },
        },
        {
            title: useLanguage.event_type,
            dataIndex: 'total_area',
            width: 190,
        },
        {
            title: useLanguage.event_content,
            ellipsis: true,
            dataIndex: 'content',
        },
        {
            title: '',
            dataIndex: 'id',
            width: 110,
            render(id: string, record: any): any {
                return events.currentId === record.id ? (
                    <Button
                        className="awe-primary-btn"
                        onClick={() => events.onCheckProcess(record)}
                    >
                        {useLanguage.process}
                    </Button>
                ) : (
                    ''
                )
            },
        },
    ]
}
