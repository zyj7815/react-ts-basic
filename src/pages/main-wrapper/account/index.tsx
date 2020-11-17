import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { UserOutlined } from '@ant-design/icons'
import './account.less'
import { RouteUris } from '@/router/config'
import { CollectionCreateForm } from './psdForm'

const MainAccount: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const handleOk = (values: any, form: any) => {
        console.log(values)
        form.resetFields()
        setVisible(false)
    }
    const handleCancel = () => {
        setVisible(false)
    }
    const editPsd = () => {
        setVisible(true)
    }
    const editInfo = () => {
        routeProps.history.push(RouteUris.EditAccount)
    }
    return (
        <div id={'account-info'}>
            <div className={'content'}>
                <div className={'avatar'}>
                    <UserOutlined />
                </div>
                <Row>
                    <Col xl={7} lg={12} md={12} sm={24}>
                        <div className={'col-content'}>
                            <div className={'col-content-top-box'}>
                                <div className={'col-content-top-box-title'}>
                                    {useLanguage.account_name}
                                </div>
                                <div className={'col-content-top-box-text'}>成都德鲁伊科技</div>
                            </div>
                            <div className={'col-content-bottom-box'}>
                                <div className={'col-content-bottom-box-title'}>
                                    {useLanguage.gender}
                                </div>
                                <div className={'col-content-bottom-box-text'}>成都德鲁伊科技</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={7} lg={12} md={12} sm={24}>
                        <div className={'col-content'}>
                            <div className={'col-content-top-box'}>
                                <div className={'col-content-top-box-title'}>
                                    {useLanguage.phone_new}
                                </div>
                                <div className={'col-content-top-box-text'}>成都德鲁伊科技</div>
                            </div>
                            <div className={'col-content-bottom-box'}>
                                <div className={'col-content-bottom-box-title'}>
                                    {useLanguage.mail}
                                </div>
                                <div className={'col-content-bottom-box-text'}>成都德鲁伊科技</div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={10} lg={24} md={24} sm={24}>
                        <div className="col-content">
                            <div className={'col-content-top-box'}>
                                <div className={'col-content-top-box-title'}>
                                    {useLanguage.address}
                                </div>
                                <div className={'col-content-top-box-text'}>
                                    四川省成都市天府三街1325号
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className={'edit-box'}>
                    <Button type="primary" className={'edit-btn'} onClick={editInfo}>
                        {useLanguage.edit_information}
                    </Button>
                    <Button type="primary" className={'edit-psd'} onClick={editPsd}>
                        {useLanguage.update_password}
                    </Button>
                </div>
                <CollectionCreateForm
                    visible={visible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                />
            </div>
        </div>
    )
}

export default MainAccount
