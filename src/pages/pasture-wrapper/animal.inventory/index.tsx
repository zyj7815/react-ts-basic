import React from 'react'
import AwePage from '@/pages/components/awe-page'
import { Row, Col } from 'antd'
import Inventorying from '@/pages/pasture-wrapper/animal.inventory/Inventorying'
import Inventoried from '@/pages/pasture-wrapper/animal.inventory/Inventoried'
import './index.less'

const AnimalInventory: React.FC = props => {
    return (
        <AwePage>
            <Row gutter={[12, 0]} style={{ height: '100%' }}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Inventorying />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Inventoried />
                </Col>
            </Row>
        </AwePage>
    )
}

export default AnimalInventory
