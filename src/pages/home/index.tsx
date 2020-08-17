import * as React from 'react'
import { observer } from 'mobx-react'
import { useRootStore } from '@/provider'
import { Layout, Row, Col } from 'antd'
import { homeConfig } from '@/pages/home/config'
import './index.less'

const Home: React.FC = () => {
    const { myself } = useRootStore()
    // React.useEffect(() => {
    //     console.log(window, myself)
    // })

    return (
        <Layout className="dr-layout-wrapper">
            <Row gutter={16}>
                <Col lg={24} xl={16}>
                    {<homeConfig.statistic.component />}
                    {<homeConfig.map.component />}
                    {<homeConfig.chart.component />}
                </Col>

                <Col lg={24} xl={8}>
                    {<homeConfig.weather.component />}
                    {<homeConfig.gateway.component />}
                    {<homeConfig.calendar.component />}
                </Col>
            </Row>
        </Layout>
    )
}

export default observer(Home)
