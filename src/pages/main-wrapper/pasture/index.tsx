import React from 'react'
import { Button, Table, Pagination } from 'antd'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'
import { PlusCircleOutlined } from '@ant-design/icons'
import { pastureColumns } from '@/pages/main-wrapper/pasture/columns'
import { useLanguage } from '@/language/useLanguage'
import { PastureProps } from '@/types/common'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { ServiceTool } from '@/utils/service-tool'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import axios from 'axios'

const MainPasture: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [dataSource, setDataSource] = React.useState<PastureProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    // 将【页码】和【条数】放到url中，pageSize=10&pageNumber=1，这样在返回页面时可以直接请求上一次的url
    // 在url中获取页码和条数
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

    return (
        <div className="awe-normal-page">
            <main className="awe-normal-main">
                <header className="awe-normal__header beauty-shadow">
                    <span>{useLanguage.pasture_list}</span>
                    <Button icon={<PlusCircleOutlined />} onClick={handleNewPasture}>
                        {useLanguage.new_pasture}
                    </Button>
                </header>

                <section className="awe-normal__content">
                    <Table
                        rowKey="id"
                        loading={loading}
                        dataSource={dataSource}
                        pagination={false}
                        scroll={{ x: 900, y: scrollY }}
                        columns={pastureColumns({
                            onCheckPasture: handleDetail,
                        })}
                    />
                </section>

                <footer className="awe-normal__footer">
                    <Pagination
                        showSizeChanger
                        pageSize={parseInt(pageSize, 10)}
                        current={parseInt(pageNumber, 10)}
                        total={total}
                        showTotal={total => useLanguage.total_number(total)}
                        onChange={onPageChange}
                    />
                </footer>
            </main>
        </div>
    )
}

export default MainPasture
