import React from 'react'
import AwePage from '@/pages/components/awe-page'
import { Layout, Button, Pagination } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { ServiceTool } from '@/utils/service-tool'
import './index.less'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'

const { Sider, Content } = Layout

const DeviceAllocationPasture: React.FC = props => {
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [dataSource, setDataSource] = React.useState<any[]>([])
    const scrollY = useWindowSize() - 400
    // 将【页码】和【条数】放到url中，pageSize=10&pageNumber=1，这样在返回页面时可以直接请求上一次的url
    // 在url中获取页码和条数
    let { pageNumber, pageSize } = ServiceTool.getPageFromUrl()

    React.useEffect(() => {
        fetchData()
    }, [forceUpdate])

    /**
     * 获取生物列表
     */
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

    const footer = (
        <Pagination
            total={total}
            showSizeChanger
            pageSize={parseInt(pageSize, 10)}
            current={parseInt(pageNumber, 10)}
            showTotal={total => useLanguage.total_number(total)}
            onChange={onPageChange}
        />
    )

    return (
        <AwePage footer={footer}>
            <Layout>
                <Sider theme="light" style={{ marginRight: 10 }}>
                    qwd
                </Sider>
                <Content>
                    <AwePage
                        noPadding={true}
                        isHPadding={true}
                        isHShadow={true}
                        hdColor={true}
                        ctColor={true}
                        header={
                            <>
                                <span />

                                <span className="awe-btn-box">
                                    <Button type="primary">{useLanguage.save}</Button>
                                    <Button>{useLanguage.cancel}</Button>
                                </span>
                            </>
                        }
                    >
                        qwd
                    </AwePage>
                </Content>
            </Layout>
        </AwePage>
    )
}

export default DeviceAllocationPasture
