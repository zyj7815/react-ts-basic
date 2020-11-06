import React from 'react'
import { useLanguage } from '@/language/useLanguage'

export const pastureColumns = () => {
    return [
        {
            title: useLanguage.pasture_name,
            dataIndex: 'name',
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
