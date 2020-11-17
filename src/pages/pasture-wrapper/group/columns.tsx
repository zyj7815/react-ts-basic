import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Utils } from '@/utils'
import { GroupProps } from '@/types/common'
import { AweColumnProps } from '@/types'
import { Button } from 'antd'

export const groupColumns = (events: AweColumnProps<GroupProps>) => {
    return [
        {
            title: useLanguage.group_name,
            dataIndex: 'room_name',
            width: 220,
            render(name: any, record: GroupProps) {
                return (
                    <span
                        onClick={() =>
                            events.onCheckDetailEvent && events.onCheckDetailEvent(record)
                        }
                        className={'group-name'}
                    >
                        {name}
                    </span>
                )
            },
        },
        {
            title: useLanguage.updating_time,
            dataIndex: 'updated_at',
            width: 220,
            render(updated_at: string) {
                return Utils.utc2Time(updated_at)
            },
        },
        {
            title: useLanguage.animal_count,
            dataIndex: 'total_biological',
            width: 170,
        },
        {
            title: useLanguage.remark,
            dataIndex: 'description',
            render(name: any, record: GroupProps) {
                return (
                    <div className={'description-box'}>
                        <span className={'description-text'}>{name}</span>
                        {events.currentId === record.id && (
                            <div>
                                <Button
                                    className={'edit-btn'}
                                    onClick={() => events.onEditEvent && events.onEditEvent(record)}
                                >
                                    {useLanguage.edit}
                                </Button>
                                <Button
                                    danger={true}
                                    onClick={() =>
                                        events.onDeleteEvent && events.onDeleteEvent(record)
                                    }
                                >
                                    {useLanguage.delete}
                                </Button>
                            </div>
                        )}
                    </div>
                )
            },
        },
        // {
        //     title: useLanguage.action,
        //     dataIndex: 'action',
        //     fixed: 'right' as 'right',
        //     width: 170,
        //     render(action: any, record: GroupProps) {
        //         return (
        //             <span className="awe-table-action">
        //                 <span
        //                     className="awe-action-item"
        //                     onClick={() => events.onEditEvent && events.onEditEvent(record)}
        //                 >
        //                     {useLanguage.edit}
        //                 </span>
        //                 <span
        //                     className="awe-action-item"
        //                     onClick={() => events.onDeleteEvent && events.onDeleteEvent(record)}
        //                 >
        //                     {useLanguage.delete}
        //                 </span>
        //             </span>
        //         )
        //     },
        // },
    ]
}
