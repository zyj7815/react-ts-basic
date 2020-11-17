import React from 'react'
import axios from 'axios'
import AwePage from '@/pages/components/awe-page'
import { Table, Button, message } from 'antd'
import { errorMessage } from '@/server/error'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { MessageProps } from '@/types/common'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { messageColumns } from '@/pages/pasture-wrapper/message/columns'
import { useLanguage } from '@/language/useLanguage'
import AweConfirm from '@/components/awe-confirm'
import dayjs from 'dayjs'
import './index.less'
import AwePagination from '@/components/awe-pagination'
import { Utils } from '@/utils'

const sortKey = 'timestamp'
const defaultPageSize = 50

const PastureMessage: React.FC = props => {
    const [dataSource, setDataSource] = React.useState<MessageProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [currentMsgId, setCurrentMsgId] = React.useState('')
    const [deleteMsgId, setDeleteMsgId] = React.useState('')
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
    const [selectedRow, setSelectedRow] = React.useState<MessageProps[]>([])
    const [visible, setVisible] = React.useState(false)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const scrollY = useWindowSize() - 240

    React.useEffect(() => {
        fetchData()
    }, [forceUpdate])

    const fetchData = async () => {
        setLoading(true)

        let { pageTag, pageSort, pageSize } = Utils.getUrlMultiParam([
            'pageTag',
            'pageSort',
            'pageNumber',
            'pageSize',
        ])

        pageSort = Utils.hasExist(pageSort) ? pageSort : '-timestamp'
        pageSize = Utils.hasExist(pageSize) ? pageSize : defaultPageSize
        pageTag = Utils.hasExist(pageTag) ? pageTag : ''

        try {
            const res = await axios.get(
                Api.message.list(pageTag),
                Token.pageToken(pageSize, 0, pageSort)
            )
            setDataSource(res.data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            errorMessage.alert(e)
        }
    }

    /**
     * 翻页
     * @param direction
     * @param pageNumber
     * @param pageSort
     */
    const onPageChange = (direction: string, pageNumber: number, pageSort: string) => {
        if (pageNumber === 1) {
            Utils.deleteUrlMultiParams(['pageTag', 'pageSort', 'pageNumber'])
            setForceUpdate(!forceUpdate)
        } else {
            let pageTag = ''
            if (direction === 'left') {
                pageTag = dataSource[0][sortKey]
            } else {
                pageTag = dataSource[dataSource.length - 1][sortKey]
            }

            Utils.pushMultiParamsToUrl({
                pageTag,
                pageSort,
                pageNumber: pageNumber,
            })

            setForceUpdate(!forceUpdate)
        }
    }

    /**
     * 切换每页条数
     * @param pageSize
     */
    const onShowSizeChange = (pageSize: number) => {
        Utils.pushParamsToUrl('pageSize', pageSize)
        setForceUpdate(!forceUpdate)
    }

    const onSelectChange = (rowKeys: React.Key[], row: MessageProps[]) => {
        setSelectedRowKeys(rowKeys)
        setSelectedRow(row)
    }

    /**
     * 删除单条数据的二次确认
     * @param msg
     */
    const handleConfirmDeleteMsg = (msg: MessageProps) => {
        setVisible(true)
        setDeleteMsgId(msg.id)
    }

    /**
     * 标记已读
     */
    const handleMarkRead = async () => {
        if (selectedRow.length === 0) {
            // 未勾选时的提醒
            message.warning(useLanguage.select_at_least_one_message)
        } else {
            const unreadMsgs = selectedRow.filter((msg: MessageProps) => !msg.readed_at)
            const unreadIds = unreadMsgs.map((msg: MessageProps) => msg.id)

            if (!unreadIds.length) {
                message.warning(useLanguage.all_read)
            } else {
                try {
                    await axios.put(Api.message.basic, { id: unreadIds }, Token.data)
                    message.success(useLanguage.success_common(useLanguage.mark_as_read))
                    setSelectedRow([])
                    setSelectedRowKeys([])

                    const data = dataSource.map((msg: MessageProps) => {
                        return {
                            ...msg,
                            readed_at: msg.readed_at
                                ? msg.readed_at
                                : unreadIds.indexOf(msg.id) > -1
                                ? dayjs().format()
                                : '',
                        }
                    })
                    console.log(data)
                    setDataSource(data)
                } catch (e) {
                    errorMessage.alert(e)
                }
            }
        }
    }

    /**
     * 删除消息确认的回调
     */
    const onDeleteMsg = () => {
        // 通过判断列表是否有deleteId判断
        // 当有deleteId就是单行数据操作
        // 如果没有就是多选操作
        if (deleteMsgId.length) {
            deleteRequest([deleteMsgId])
        } else {
            deleteRequest(selectedRowKeys)
        }
    }

    /**
     * 删除多条消息
     */
    const handleDeleteMultiMsg = () => {
        if (!selectedRow.length) {
            message.warning(useLanguage.select_at_least_one_message)
        } else {
            setVisible(true)
        }
    }

    const deleteRequest = async (ids: React.Key[]) => {
        try {
            await axios.put(Api.message.del, { id: ids }, Token.data)
            setVisible(false)
            setDeleteMsgId('')
            setSelectedRow([])
            setSelectedRowKeys([])
            setForceUpdate(!forceUpdate)
        } catch (e) {
            errorMessage.alert(e)
        }
    }

    const header = (
        <>
            <span />
            <header className="awe-btn-box">
                <Button onClick={handleMarkRead}>{useLanguage.mark_as_read}</Button>
                <Button danger={true} onClick={handleDeleteMultiMsg}>
                    {useLanguage.delete}
                </Button>
            </header>
        </>
    )

    const footer = () => {
        let { pageNumber, pageSize } = Utils.getUrlMultiParam(['pageNumber', 'pageSize'])
        pageNumber = Utils.hasExist(pageNumber) ? pageNumber : 1
        pageSize = Utils.hasExist(pageSize) ? pageSize : defaultPageSize

        return (
            <AwePagination
                disable={loading}
                pageSizeOption={[defaultPageSize, 100]}
                pageSize={pageSize}
                pageNumber={pageNumber}
                currentPageTotal={dataSource.length}
                onChange={onPageChange}
                onShowSizeChange={onShowSizeChange}
                defaultSort={`-${sortKey}`}
            />
        )
    }

    return (
        <AwePage hdColor={true} isHPadding={true} header={header} footer={footer()}>
            <Table
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 1000, y: scrollY }}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
                columns={messageColumns({
                    currentId: currentMsgId,
                    onDeleteEvent: handleConfirmDeleteMsg,
                })}
                onRow={(record: MessageProps) => {
                    return {
                        onMouseEnter: () => setCurrentMsgId(record.id),
                        onMouseLeave: () => setCurrentMsgId(''),
                    }
                }}
            />

            <AweConfirm
                visible={visible}
                onCancel={() => setVisible(false)}
                onConfirm={onDeleteMsg}
            />
        </AwePage>
    )
}

export default PastureMessage
