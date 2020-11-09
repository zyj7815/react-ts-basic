import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Utils } from '@/utils'
import { GroupProps } from '@/types/common'

interface GroupColumnsProps {
    onCheckGroup: (group: GroupProps) => void
    onEditGroup: (group: GroupProps) => void
    onDeleteGroup: (group: GroupProps) => void
}

export const groupColumns = (event: GroupColumnsProps) => {
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
                            onClick={() => event.onCheckGroup(record)}
                        >
                            {useLanguage.view}
                        </span>
                        <span className="awe-action-item" onClick={() => event.onEditGroup(record)}>
                            {useLanguage.edit}
                        </span>
                        <span
                            className="awe-action-item"
                            onClick={() => event.onDeleteGroup(record)}
                        >
                            {useLanguage.delete}
                        </span>
                    </span>
                )
            },
        },
    ]
}
