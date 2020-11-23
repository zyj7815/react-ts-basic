import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Button } from 'antd'
import { FenceProps } from '@/types/common'
import { PlusCircleOutlined } from '@ant-design/icons'
import { AweColumnProps } from '@/types'

interface fenceColumnsProps extends AweColumnProps<FenceProps> {
    onCheckAnimal: (fence: FenceProps) => void
}

export const fenceColumns = (events: fenceColumnsProps) => {
    return [
        {
            title: useLanguage.fence_name,
            dataIndex: 'area_name',
            width: 150,
            render(name: number, record: FenceProps) {
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
            title: useLanguage.animal_count,
            dataIndex: 'total_biological',
            width: 190,
            render(total: number, record: FenceProps) {
                return (
                    <span className="awe-action-item" onClick={() => events.onCheckAnimal(record)}>
                        {total ? total : <PlusCircleOutlined />}
                    </span>
                )
            },
        },
        {
            title: useLanguage.fence_type,
            dataIndex: 'temperature',
            width: 190,
        },
        {
            title: useLanguage.newnotification,
            dataIndex: 'temperature',
            width: 190,
        },
        {
            title: useLanguage.area,
            dataIndex: 'area',
            render: () => `124135233.123 ㎡`,
        },
        {
            title: '',
            dataIndex: 'id',
            width: 110,
            render(id: string, record: FenceProps): any {
                return events.currentId === record.id ? (
                    <Button danger>{useLanguage.delete}</Button>
                ) : (
                    ''
                )
            },
        },
    ]
}
