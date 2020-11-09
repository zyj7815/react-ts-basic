import React from 'react'
import { Row, Col } from 'antd'
import OverviewMap from '@/pages/pasture-wrapper/overview/overview-map'
import OverviewAnimal from '@/pages/pasture-wrapper/overview/overview-animal'
import OverviewWeather from '@/pages/pasture-wrapper/overview/overview-weather'
import OverviewEvent from '@/pages/pasture-wrapper/overview/overview-event'
import OverviewMessage from '@/pages/pasture-wrapper/overview/overview-message'
import './index.less'

const PastureOver: React.FC = props => {
    return (
        <div className="awe-normal-page">
            <main className="pasture-overview-wrapper">
                <Row gutter={[12, 0]} style={{ height: '100%' }}>
                    <Col xs={24} sm={24} md={24} lg={14} xl={15}>
                        <Row gutter={[12, 12]} style={{ height: '100%' }}>
                            <Col span={24}>
                                <OverviewMap />
                            </Col>
                            <Col span={24}>
                                <OverviewAnimal />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={10} xl={9}>
                        <Row gutter={[12, 12]} style={{ height: '100%' }}>
                            <Col span={24} style={{ height: '38%' }}>
                                <OverviewWeather />
                            </Col>
                            <Col span={24} style={{ height: '35%' }}>
                                <OverviewEvent />
                            </Col>
                            <Col span={24} style={{ height: '27%' }}>
                                <OverviewMessage />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </main>
        </div>
    )
}

export default PastureOver
