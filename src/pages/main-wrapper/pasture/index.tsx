import React from 'react'
import { Button, Table, Pagination } from 'antd'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'
import { PlusCircleOutlined } from '@ant-design/icons'
import { pastureColumns } from '@/pages/main-wrapper/pasture/columns'
import { useLanguage } from '@/language/useLanguage'
import { PastureProps } from '@/model'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { ServiceTip } from '@/service'
import { errorMessage } from '@/server/error'
import { Helper } from '@/helper'
import axios from 'axios'
import AwePage from '@/components/awe-page'

const MainPasture: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [dataSource, setDataSource] = React.useState<PastureProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [currentId, setCurrentId] = React.useState('')
    // 将【页码】和【条数】放到url中，pageSize=10&pageNumber=1，这样在返回页面时可以直接请求上一次的url
    // 在url中获取页码和条数
    let { pageNumber, pageSize } = ServiceTip.getPageFromUrl()
    const scrollY = useWindowSize() - 240

    React.useEffect(() => {
        fetchData()
    }, [forceUpdate])

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                Api.biological.list,
                Token.pageToken(pageSize, (pageNumber - 1) * pageSize)
            )
            setTotal(parseInt(res.headers['x-result-count']))
            setDataSource(res.data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            errorMessage.alert(err)
        }
    }

    /**
     * 翻页、更改条数操作
     * @param pageNumber
     * @param pageSize
     */
    const onPageChange = (pageNumber: number, pageSize?: number) => {
        Helper.pushMultiParamsToUrl({
            pageSize,
            pageNumber,
        })
        setForceUpdate(!forceUpdate)
    }

    /**
     * 新建牧场
     */
    const handleNewPasture = () => {
        routeProps.history.push(RouteUris.MainPastureNew)
    }

    /**
     * 查看牧场详情
     * @param pasture
     */
    const handleDetail = (pasture: PastureProps) => {
        routeProps.history.push(RouteUris.PastureOverview(pasture.id))
    }

    /**
     * 编辑牧场详情
     * @param pasture
     */
    const handleEdit = (pasture: PastureProps) => {
        routeProps.history.push(RouteUris.MainPastureEdit(pasture.id))
    }

    const header = (
        <>
            <span>{useLanguage.pasture_list}</span>
            <Button icon={<PlusCircleOutlined />} onClick={handleNewPasture}>
                {useLanguage.new_pasture}
            </Button>
        </>
    )

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
        <AwePage
            hdColor={true}
            ctColor={true}
            isHPadding={true}
            isHShadow={true}
            header={header}
            footer={footer}
        >
            <Table
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 1100, y: scrollY }}
                columns={pastureColumns({
                    currentId: currentId,
                    onCheckDetailEvent: handleDetail,
                    onEditEvent: handleEdit,
                })}
                onRow={(record: PastureProps) => {
                    return {
                        onMouseEnter: () => setCurrentId(record.id),
                        onMouseLeave: () => setCurrentId(''),
                    }
                }}
            />
        </AwePage>
    )
}

export default MainPasture
