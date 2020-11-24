import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Button } from 'antd'
import { Helper } from '@/helper'
import { AweColumnProps } from '@/types'
import { SecretProps } from '@/model'

export const secretColumns = (events: AweColumnProps<SecretProps>) => {
    return [
        {
            title: useLanguage.name,
            dataIndex: 'nickname',
            width: 150,
            render(name: number, record: SecretProps) {
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
            title: 'access id',
            dataIndex: 'access_id',
            width: 260,
        },
        {
            title: 'secret',
            dataIndex: 'secret_id',
            width: 260,
        },
        {
            title: useLanguage.created_date,
            dataIndex: 'updated_at',
            width: 210,
            render(updated_at: string): any {
                return Helper.utc2Time(updated_at)
            },
        },
        {
            title: '',
            dataIndex: 'id',
            width: 110,
            render(id: string, record: SecretProps) {
                return events.currentId === record.id ? (
                    <Button
                        danger
                        onClick={() => events.onDeleteEvent && events.onDeleteEvent(record)}
                    >
                        {useLanguage.delete}
                    </Button>
                ) : (
                    ''
                )
            },
        },
    ]
}
