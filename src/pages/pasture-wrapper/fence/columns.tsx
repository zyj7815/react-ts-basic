import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Button } from 'antd'
import { FenceProps } from '@/types/common'
import { PlusCircleOutlined } from '@ant-design/icons'
import { AweColumnProps } from '@/types'
import { FenceMessageType, FenceShapeType } from '@/enum'
import { calculateArea } from '@/utils/area'

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
            width: 110,
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
            dataIndex: 'type',
            render(type: string) {
                return type === FenceShapeType.FencePolygon
                    ? useLanguage.polygon
                    : useLanguage.circle
            },
        },
        {
            title: useLanguage.newnotification,
            dataIndex: 'msg_type',
            render(msg_type: number) {
                return msg_type === FenceMessageType.EnterFence
                    ? useLanguage.into_fence
                    : useLanguage.leave_fence
            },
        },
        {
            title: useLanguage.area,
            dataIndex: 'area',
            render(area: number, record: FenceProps) {
                let fenceArea = 0

                if (record.distance) {
                    // 圆形
                    fenceArea = Math.PI * record.distance * record.distance
                } else {
                    // 多边形
                    fenceArea = calculateArea(record.polygon.points)
                }

                if (fenceArea > 10000000) {
                    fenceArea = fenceArea / 1000000
                    return `${parseFloat(fenceArea.toFixed(2))} k㎡`
                } else {
                    return `${Math.floor(fenceArea)} ㎡`
                }
            },
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
