import React from 'react'
import AwePage from '@/pages/components/awe-page'
import { Button, Form, Row, Col, Input, InputNumber } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { formFullLayout } from '@/config'

const FormItem = Form.Item

const PastureInfo: React.FC = props => {
    const [form] = Form.useForm()

    const header = (
        <>
            <span className="awe-primary-title">{useLanguage.pasture_info}</span>
            <Button>{useLanguage.edit_basic}</Button>
        </>
    )

    return (
        <AwePage className="pasture-info-wrapper beauty-radius beauty-shadow" header={header}>
            <Form form={form} {...formFullLayout}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={15}>
                        <Row gutter={[24, 0]}>
                            <Col xs={24} sm={12} md={24} lg={12} xl={11}>
                                <FormItem label={useLanguage.pasture_name} name="name">
                                    <Input />
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={11}>
                                <FormItem label={useLanguage.phone} name="phone">
                                    <Input />
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={22}>
                                <FormItem label={useLanguage.address} name="address">
                                    <Input />
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={9}>
                        <Row>
                            <Col span={24}>
                                <FormItem label={useLanguage.mail} name="email">
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label={useLanguage.area} name="area">
                                    <Input suffix="㎡" />
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </AwePage>
    )
}

export default PastureInfo
