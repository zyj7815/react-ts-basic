import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Utils } from '@/utils'
import { GroupProps } from '@/types/common'
import { AweColumnProps } from '@/types'

export const groupColumns = (events: AweColumnProps<GroupProps>) => {
    return [
        {
            title: useLanguage.group_name,
            dataIndex: 'room_name',
        },
        {
            title: useLanguage.updating_time,
            dataIndex: 'updated_at',
            render(updated_at: string) {
                return Utils.utc2Time(updated_at)
            },
        },
        {
            title: useLanguage.animal_count,
            dataIndex: 'total_biological',
        },
        {
            title: useLanguage.remark,
            dataIndex: 'description',
        },
        {
            title: useLanguage.action,
            dataIndex: 'action',
            fixed: 'right' as 'right',
            width: 170,
            render(action: any, record: GroupProps) {
                return (
                    <span className="awe-table-action">
                        <span
                            className="awe-action-item"
                            onClick={() =>
                                events.onCheckDetailEvent && events.onCheckDetailEvent(record)
                            }
                        >
                            {useLanguage.view}
                        </span>
                        <span
                            className="awe-action-item"
                            onClick={() => events.onEditEvent && events.onEditEvent(record)}
                        >
                            {useLanguage.edit}
                        </span>
                        <span
                            className="awe-action-item"
                            onClick={() => events.onDeleteEvent && events.onDeleteEvent(record)}
                        >
                            {useLanguage.delete}
                        </span>
                    </span>
                )
            },
        },
    ]
}
