import React from 'react'
import AwePage from '@/components/awe-page'
import { Breadcrumb, Button, Row, Col } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { EditPastureInfo } from '@/pages/main-wrapper/pasture/edit/edit-info'
import { EditPastureLocation } from '@/pages/main-wrapper/pasture/edit/edit-location'
import { AweRouteProps } from '@/types/route'
import './index.less'

const EditPasture: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const handleBack = () => {
        routeProps.history.goBack()
    }

    const nav = (
        <>
            <Breadcrumb className="awe-page-breadcrumb">
                <Breadcrumb.Item>{useLanguage.pasture_management}</Breadcrumb.Item>
                <Breadcrumb.Item>{useLanguage.edit_pature}</Breadcrumb.Item>
            </Breadcrumb>

            <span className="awe-btn-box">
                <Button onClick={handleBack}>{useLanguage.cancel}</Button>
                <Button type="primary">{useLanguage.save}</Button>
            </span>
        </>
    )

    return (
        <AwePage nav={nav}>
            <Row style={{ height: '100%' }}>
                <Col xs={24} sm={24} md={24} lg={10} xl={9} xxl={7}>
                    <EditPastureInfo />
                </Col>
                <Col xs={24} sm={24} md={24} lg={14} xl={15} xxl={17}>
                    <EditPastureLocation />
                </Col>
            </Row>
        </AwePage>
    )
}

export default EditPasture
