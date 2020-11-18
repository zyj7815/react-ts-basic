import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Button } from 'antd'
import { KeyProps } from '@/types/common'
import { Utils } from '@/utils'

type keyColumnsProps = {
    currentRoleId: string
    onCheckKey: (key: KeyProps) => void
    delete: () => void
}

export const keyColumns = (events: keyColumnsProps) => {
    return [
        {
            title: useLanguage.name,
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
            title: 'access id',
            dataIndex: 'device_type',
            width: 190,
        },
        {
            title: 'secret',
            dataIndex: 'temperature',
            width: 190,
        },
        {
            title: useLanguage.created_date,
            dataIndex: 'updated_at',
            render(updated_at: string, record: any): any {
                return (
                    <div className={'created-date-box'}>
                        <div className={'created-date-text'}>{Utils.utc2Time(updated_at)}</div>
                        <div>
                            {events.currentRoleId === record.id ? (
                                <Button
                                    className={'created-date-btn'}
                                    danger
                                    onClick={events.delete}
                                >
                                    {useLanguage.delete}
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
