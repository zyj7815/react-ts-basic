import React from 'react'
import { Row, Col } from 'antd'
import { AweNavPage } from '@/pages/components/page-nav'
import DeviceInfo from '@/pages/main-wrapper/device/detail/device-info'
import DeviceAnimal from '@/pages/main-wrapper/device/detail/device-animal'
import DevicePasture from '@/pages/main-wrapper/device/detail/device-pasture'
import './index.less'
import DeviceMap from '@/pages/main-wrapper/device/detail/device-map'

const DeviceDetail: React.FC = props => {
    return (
        <AweNavPage>
            <article className="awe-page-wrapper">
                <section className="main-device-detail">
                    <header className="main-device-detail__header">
                        <Row gutter={[12, 12]}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={7}>
                                <DeviceInfo />
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={10}>
                                <DeviceAnimal />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={7}>
                                <DevicePasture />
                            </Col>
                        </Row>
                    </header>

                    <main className="main-device-detail__map">
                        <DeviceMap />
                    </main>
                </section>
            </article>
        </AweNavPage>
    )
}

export default DeviceDetail
