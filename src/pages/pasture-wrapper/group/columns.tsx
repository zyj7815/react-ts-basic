import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Utils } from '@/utils'

export const groupColumns = () => {
    return [
        {
            title: useLanguage.group_name,
            dataIndex: 'room_name',
        },
        {
            title: useLanguage.created_date,
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
            render() {
                return (
                    <span className="awe-table-action">
                        <span className="awe-action-item">{useLanguage.view}</span>
                        <span className="awe-action-item">{useLanguage.edit}</span>
                        <span className="awe-action-item">{useLanguage.delete}</span>
                    </span>
                )
            },
        },
    ]
}
