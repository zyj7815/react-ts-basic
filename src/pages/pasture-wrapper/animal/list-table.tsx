import React from 'react'
import { Layout, Table, Pagination } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { animalColumns } from '@/pages/pasture-wrapper/animal/columns'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { Utils } from '@/utils'
import { ServiceTool } from '@/utils/service-tool'
import axios from 'axios'

const { Content, Footer } = Layout

const AnimalListTable: React.FC = props => {
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [dataSource, setDataSource] = React.useState<any[]>([])
    const scrollY = useWindowSize() - 380

    React.useEffect(() => {
        fetchData()
    }, [forceUpdate])

    /**
     * 获取生物列表
     */
    const fetchData = async () => {
        setLoading(true)

        try {
            // 将【页码】和【条数】放到url中，pageSize=10&pageNumber=1，这样在返回页面时可以直接请求上一次的url
            // 在url中获取页码和条数
            let { pageNumber, pageSize } = ServiceTool.getPageFromUrl()

            const res = await axios.get(
                Api.biological.list,
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

    let { pageNumber, pageSize } = ServiceTool.getPageFromUrl()

    return (
        <Layout>
            <Content>
                <Table
                    pagination={false}
                    loading={loading}
                    scroll={{ x: 1020, y: scrollY }}
                    dataSource={dataSource}
                    columns={animalColumns()}
                />
            </Content>
            <Footer className="awe-page__layout-footer">
                <Pagination
                    showSizeChanger
                    pageSize={parseInt(pageSize, 10)}
                    current={parseInt(pageNumber, 10)}
                    total={total}
                    showTotal={total => useLanguage.total_number(total)}
                    onChange={onPageChange}
                />
            </Footer>
        </Layout>
    )
}

export default AnimalListTable
