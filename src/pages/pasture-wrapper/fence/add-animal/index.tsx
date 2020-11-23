import React, { useState } from 'react'
import { AweRouteProps } from '@/types/route'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { Breadcrumb, Button, Input, Pagination, Table } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import AwePage from '@/pages/components/awe-page'
import './index.less'
import { animalColumns } from '@/pages/pasture-wrapper/animal.list/columns'

const FenceAddBiological: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [dataSource, setDataSource] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [currentId, setCurrentId] = React.useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    let { pageNumber, pageSize } = ServiceTool.getPageFromUrl()
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
        Utils.pushMultiParamsToUrl({
            pageSize,
            pageNumber,
        })
        setForceUpdate(!forceUpdate)
    }

    const onSearch = (value: string) => {
        console.log(value)
    }

    const back = () => {
        routeProps.history.goBack()
    }

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const nav = (
        <Breadcrumb className="awe-page-breadcrumb">
            <Breadcrumb.Item>{useLanguage.fence_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.add_creature}</Breadcrumb.Item>
        </Breadcrumb>
    )

    const header = (
        <>
            <div />
            <div>
                <Button className={'create_fence_btn'} style={{ marginRight: 10 }} onClick={back}>
                    {useLanguage.back}
                </Button>
                <Button type={'primary'} className={'create_fence_btn'}>
                    {useLanguage.save}
                </Button>
            </div>
        </>
    )

    const footer = (
        <Pagination
            showSizeChanger
            pageSize={parseInt(pageSize, 10)}
            current={parseInt(pageNumber, 10)}
            showTotal={total => useLanguage.total_number(total)}
            onChange={onPageChange}
            total={total}
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
            nav={nav}
            id={'pasture-fence-add-biological'}
        >
            <Table
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                rowSelection={rowSelection}
                scroll={{ x: 900, y: scrollY }}
                columns={animalColumns({})}
            />
        </AwePage>
    )
}

export default FenceAddBiological
