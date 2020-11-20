import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Button } from 'antd'
import { KeyProps } from '@/types/common'
import { Utils } from '@/utils'
import { PlusCircleOutlined } from '@ant-design/icons'

type bioColumnsProps = {
    currentId: string
    onCheckKey: (key: KeyProps) => void
    onAddBio: (key: KeyProps) => void
}

export const bioColumns = (events: bioColumnsProps) => {
    return [
        {
            title: useLanguage.bio_name,
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
            dataIndex: 'updated_at',
            render(updated_at: string, record: any): any {
                return (
                    <div className={'created-date-box'}>
                        <div className={'created-date-text'}>{Utils.utc2Time(updated_at)}</div>
                        {/*<div>*/}
                        {/*    {events.currentId === record.id ? (*/}
                        {/*        <Button className={'created-date-btn'} danger>*/}
                        {/*            {useLanguage.delete}*/}
                        {/*        </Button>*/}
                        {/*    ) : (*/}
                        {/*        ''*/}
                        {/*    )}*/}
                        {/*</div>*/}
                    </div>
                )
            },
        },
    ]
}
