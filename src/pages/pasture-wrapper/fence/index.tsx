import React from 'react'
import { AweRouteProps } from '@/types/route'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { FenceProps } from '@/types/common'
import { RouteUris } from '@/router/config'
import { Button, Input, Pagination, Table } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import AwePage from '@/pages/components/awe-page'
import { fenceColumns } from '@/pages/pasture-wrapper/fence/columns'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import './index.less'

const PastureFence: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { pastureId } = routeProps.match.params
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
                Api.geofence.list,
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

    //
    const handleFenceDetail = (fence: FenceProps) => {}

    const onSearch = (value: string) => {
        console.log(value)
    }

    const onCheckAnimal = (fence: FenceProps) => {
        if (fence.total_biological) {
            // 有生物时执行查看生物的操作
        } else {
            // 无生物时，跳转到分配生物列表
            routeProps.history.push(RouteUris.PastureFenceAddBiological(pastureId, fence.id))
        }
    }

    const header = (
        <>
            <Input
                style={{ width: 200 }}
                className="awe-row-reverse"
                placeholder={useLanguage.search_device}
                prefix={<AweIcon type={aweIconType['icon-search2']} />}
                onChange={e => onSearch(e.target.value)}
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
                    onCheckDetailEvent: handleFenceDetail,
                    currentId: currentId,
                    onCheckAnimal: onCheckAnimal,
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
