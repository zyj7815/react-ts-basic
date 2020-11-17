import React from 'react'
import { AweRouteProps } from '@/types/route'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { KeyProps } from '@/types/common'
import { RouteUris } from '@/router/config'
import { Button, Input, Pagination, Table } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import AwePage from '@/pages/components/awe-page'
import { fenceColumns } from '@/pages/pasture-wrapper/fence/columns'
import './index.less'
const { Search } = Input

const PastureFence: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [dataSource, setDataSource] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [currentId, setCurrentId] = React.useState('')
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

    const handleKeyDetail = (device: KeyProps) => {
        routeProps.history.push(RouteUris.MainDeviceDetail(device.id))
    }

    const onAddBio = (device: any) => {
        console.log(device)
    }

    const onSearch = (value: string) => {
        console.log(value)
    }

    const header = (
        <>
            <Search
                placeholder={useLanguage.search_fence_name}
                onSearch={onSearch}
                style={{ width: 200 }}
                className={'search-input'}
            />
            <Button className={'create_fence_btn'}>{useLanguage.new_fence}</Button>
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
            id={'pasture-fence'}
        >
            <Table
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 900, y: scrollY }}
                columns={fenceColumns({
                    onCheckKey: handleKeyDetail,
                    currentId: currentId,
                    onAddBio: onAddBio,
                })}
                onRow={(record, index) => {
                    return {
                        onMouseEnter: () => setCurrentId(record.id),
                        onMouseLeave: () => setCurrentId(''),
                    }
                }}
            />
        </AwePage>
    )
}

export default PastureFence
