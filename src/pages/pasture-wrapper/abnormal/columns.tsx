import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Button } from 'antd'
import { KeyProps } from '@/types/common'
import { Utils } from '@/utils'

type keyColumnsProps = {
    currentId: string
    onCheckKey: (key: KeyProps) => void
    onCheckProcess: (key: any) => void
}

export const keyColumns = (events: keyColumnsProps) => {
    return [
        {
            title: useLanguage.bio_name,
            dataIndex: 'nickname',
            width: 120,
            render(name: number, record: KeyProps) {
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
            width: 190,
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
            dataIndex: 'updated_at',
            render(updated_at: string, record: any): any {
                return (
                    <div className={'created-date-box'}>
                        <div className={'created-date-text'}>{Utils.utc2Time(updated_at)}</div>
                        <div>
                            {events.currentId === record.id ? (
                                <Button
                                    className={'created-date-btn'}
                                    onClick={() => {
                                        events.onCheckProcess(record)
                                    }}
                                >
                                    {useLanguage.process}
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                )
            },
        },
    ]
}
