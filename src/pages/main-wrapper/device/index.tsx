import React from 'react'
import axios from 'axios'
import { DeviceProps } from '@/types/common'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { Pagination, Table } from 'antd'
import { deviceColumns } from '@/pages/main-wrapper/device/columns'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'

const MainDevice: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [dataSource, setDataSource] = React.useState<DeviceProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
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

    const handleDeviceDetail = (device: DeviceProps) => {
        routeProps.history.push(RouteUris.MainDeviceDetail(device.id))
    }

    return (
        <div className="awe-normal-page">
            <main className="awe-normal-main">
                <header className="awe-normal__header beauty-shadow">qwdkqwd</header>

                <section className="awe-normal__content">
                    <Table
                        rowKey="id"
                        loading={loading}
                        dataSource={dataSource}
                        pagination={false}
                        scroll={{ x: 900, y: scrollY }}
                        columns={deviceColumns({
                            onCheckDevice: handleDeviceDetail,
                        })}
                    />
                </section>
                <footer className="awe-normal__footer">
                    <Pagination
                        showSizeChanger
                        pageSize={parseInt(pageSize, 10)}
                        current={parseInt(pageNumber, 10)}
                        showTotal={total => useLanguage.total_number(total)}
                        onChange={onPageChange}
                        total={total}
                    />
                </footer>
            </main>
        </div>
    )
}

export default MainDevice
