import React from 'react'
import { AweColumnProps } from '@/types'
import { Button } from 'antd'
import { MessageProps } from '@/types/common'
import { useLanguage } from '@/language/useLanguage'
import { ServiceTool } from '@/utils/service-tool'
import { Utils } from '@/utils'
import { ReadMsg, UnreadMsg } from '@/assets/images/icon'

export const messageColumns = (events: AweColumnProps<MessageProps>) => {
    return [
        {
            title: useLanguage.read,
            dataIndex: 'readed_at',
            width: 90,
            render(readed_at: string) {
                return <img src={readed_at ? ReadMsg : UnreadMsg} alt="" />
            },
        },
        {
            title: useLanguage.message_type,
            dataIndex: 'type',
            width: 130,
            render(type: number) {
                return ServiceTool.getMsgType(type)
            },
        },
        {
            title: useLanguage.content,
            dataIndex: (window as any).isEn ? 'msg' : 'msg_cn',
            render(msg: string) {
                return msg
            },
        },
        {
            title: useLanguage.time,
            dataIndex: 'timestamp',
            width: 210,
            render(timestamp: string) {
                return Utils.utc2Time(timestamp)
            },
        },
        {
            title: '',
            dataIndex: 'id',
            width: 90,
            render(id: string, record: MessageProps) {
                return events.currentId === id ? (
                    <Button
                        danger={true}
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
