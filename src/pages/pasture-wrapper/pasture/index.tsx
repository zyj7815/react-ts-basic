import React from 'react'
import AwePage from '@/components/awe-page'
import { Row, Col } from 'antd'
import PastureInfo from '@/pages/pasture-wrapper/pasture/info'
import PastureMap from '@/pages/pasture-wrapper/pasture/map'
import PastureDescription from '@/pages/pasture-wrapper/pasture/description'
import './index.less'

const PastureDetail: React.FC = props => {
    React.useEffect(() => {}, [])

    return (
        <AwePage className="pasture-detail-wrapper">
            <Row gutter={[12, 0]}>
                <Col xs={24} sm={24} md={24} lg={14} xl={15} xxl={14}>
                    <Row gutter={[0, 12]}>
                        <Col span={24}>
                            <PastureInfo />
                        </Col>
                        <Col span={24}>
                            <PastureMap />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={24} lg={10} xl={9} xxl={10}>
                    <PastureDescription />
                </Col>
            </Row>
        </AwePage>
    )
}

export default PastureDetail
