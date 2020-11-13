import React, { useState } from 'react'
import AwePage from '@/pages/components/awe-page'
import { Button, Col, Row, Avatar, Modal, Form, Input } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { UserOutlined } from '@ant-design/icons'
import './account.less'
import { RouteUris } from '@/router/config'

const MainAccount: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const handleOk = (values: any) => {
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
                <Modal
                    visible={visible}
                    title={useLanguage.update_password}
                    bodyStyle={{ paddingBottom: 0 }}
                    className={'editPsdModal'}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            {useLanguage.cancel}
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={() => {
                                form.validateFields()
                                    .then(values => {
                                        handleOk(values)
                                    })
                                    .catch(info => {
                                        console.log('Validate Failed:', info)
                                    })
                            }}
                        >
                            {useLanguage.modify}
                        </Button>,
                    ]}
                >
                    <Form
                        labelCol={{ span: 5 }}
                        form={form}
                        wrapperCol={{ span: 19 }}
                        layout="horizontal"
                    >
                        <Form.Item
                            label={useLanguage.old_password}
                            name="old_password"
                            rules={[{ required: true, message: '请输入公司名称' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={useLanguage.new_password}
                            name="new_password"
                            rules={[{ required: true, message: '请输入公司名称' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={useLanguage.confirm_new_password}
                            name="confirm_new_password"
                            rules={[{ required: true, message: '请输入公司名称' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default MainAccount
