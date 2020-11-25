import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Button } from 'antd'
import { Utils } from '@/utils'
import { AweColumnProps } from '@/types'
import { AbnormalProps } from '@/types/common'

interface AbnormalColumnsProps extends AweColumnProps<AbnormalProps> {
    onResolveAbnormal: (record: AbnormalProps) => void
}

export const abnormalColumns = (events: AbnormalColumnsProps) => {
    return [
        {
            title: useLanguage.bio_name,
            dataIndex: 'nickname',
            render(name: number, record: AbnormalProps) {
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
            title: useLanguage.time_of_occurrence,
            dataIndex: 'updated_at',
            width: 210,
            render(updated_at: string, record: AbnormalProps): any {
                return Utils.utc2Time(updated_at)
            },
        },
        {
            title: useLanguage.event_type,
            dataIndex: 'type',
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
            render(id: string, record: AbnormalProps): any {
                return events.currentId === record.id ? (
                    <Button
                        className="awe-primary-btn"
                        onClick={() => events.onResolveAbnormal(record)}
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
