import React from 'react'
import { Layout, Table, Pagination } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { ServiceTool } from '@/utils/service-tool'
import { Utils } from '@/utils'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { groupColumns } from '@/pages/pasture-wrapper/group/columns'
import { GroupProps } from '@/types/common'
import AwePage from '@/pages/components/awe-page'

const { Content, Footer } = Layout

interface GroupListTableProps {
    newGroup: GroupProps | null
    onCheckGroup: (group: GroupProps) => void
    onEditGroup: (group: GroupProps) => void
    onDeleteGroup: (group: GroupProps) => void
}

const GroupListTable: React.FC<GroupListTableProps> = (props: GroupListTableProps) => {
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [dataSource, setDataSource] = React.useState<any[]>([])
    const scrollY = useWindowSize() - 380
    // 将【页码】和【条数】放到url中，pageSize=10&pageNumber=1，这样在返回页面时可以直接请求上一次的url
    // 在url中获取页码和条数
    let { pageNumber, pageSize } = ServiceTool.getPageFromUrl()

    React.useEffect(() => {
        if (props.newGroup) {
            // 新建分组
            onNewGroupEvent()
        }

        fetchData()
    }, [forceUpdate, props.newGroup])

    const fetchData = async () => {
        setLoading(true)

        try {
            const res = await axios.get(
                Api.group.list,
                Token.pageToken(pageSize, (pageNumber - 1) * pageSize)
            )
            setTotal(parseInt(res.headers['x-result-count']))
            setDataSource(res.data)
            setLoading(false)
        } catch (err) {
            errorMessage.alert(err)
            setLoading(false)
        }
    }

    /**
     * 翻页、更改条数操作
     * @param pageNumber
     * @param pageSize
     */
    const onPageChange = (pageNumber: number, pageSize?: number) => {
        Utils.pushMultiParamsToUrl({
            pageSize,
            pageNumber,
        })
        setForceUpdate(!forceUpdate)
    }

    /**
     * 当新增分组后触发的事件
     */
    const onNewGroupEvent = () => {
        if (pageNumber === 1) {
            fetchData()
        } else {
            onPageChange(1, pageSize)
        }
    }

    const footer = (
        <Pagination
            showSizeChanger
            pageSize={parseInt(pageSize, 10)}
            current={parseInt(pageNumber, 10)}
            total={total}
            showTotal={total => useLanguage.total_number(total)}
            onChange={onPageChange}
        />
    )

    return (
        <AwePage ctColor={true} noPadding={true} footer={footer}>
            <Table
                pagination={false}
                loading={loading}
                scroll={{ x: 950, y: scrollY }}
                dataSource={dataSource}
                columns={groupColumns({
                    onCheckGroup: props.onCheckGroup,
                    onEditGroup: props.onEditGroup,
                    onDeleteGroup: props.onDeleteGroup,
                })}
            />
        </AwePage>
    )
}

export default GroupListTable
