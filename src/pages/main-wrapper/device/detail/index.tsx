import React from 'react'
import { Row, Col } from 'antd'
import { AweNavPage } from '@/pages/components/page-nav'
import './index.less'

const DeviceDetail: React.FC = props => {
    return (
        <AweNavPage>
            <article className="awe-page-wrapper">
                <section className="main-device-detail">
                    <Row gutter={[12, 12]}>
                        <Col sm={24} md={12} lg={12} xl={7} xxl={6}>
                            <div className="main-device-header__item">11</div>
                        </Col>
                        <Col sm={24} md={12} lg={12} xl={10} xxl={12}>
                            <div className="main-device-header__item">11</div>
                        </Col>
                        <Col sm={24} md={24} lg={24} xl={7} xxl={6}>
                            <div className="main-device-header__item">11</div>
                        </Col>
                        <Col sm={24} md={24} lg={24}>
                            <div className="main-device-item">11</div>
                        </Col>
                    </Row>
                </section>
            </article>
        </AweNavPage>
    )
}

export default DeviceDetail
