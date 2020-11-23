import React from 'react'
import AwePage from '@/pages/components/awe-page'
import { Button, Form, Row, Col, Input, InputNumber } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { formFullLayout } from '@/config'

const FormItem = Form.Item

const PastureInfo: React.FC = props => {
    const [isEdit, setIsEdit] = React.useState(false)

    const [form] = Form.useForm()

    React.useEffect(() => {
        console.log('123')

        form.setFieldsValue({
            name: 'xx牧场',
            phone: '13329182837',
            email: '123123@123.com',
            address: '四川省成都市高新区',
            area: 123.22,
        })
    }, [])

    const header = (
        <>
            <span className="awe-primary-title">{useLanguage.pasture_info}</span>

            {isEdit ? (
                <span className="awe-btn-box">
                    <Button type="primary" onClick={() => setIsEdit(!isEdit)}>
                        {useLanguage.save}
                    </Button>
                    <Button onClick={() => setIsEdit(!isEdit)}>{useLanguage.cancel}</Button>
                </span>
            ) : (
                <Button onClick={() => setIsEdit(!isEdit)}>{useLanguage.edit_basic}</Button>
            )}
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
                                    <Input disabled={!isEdit} />
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={12} md={24} lg={12} xl={11}>
                                <FormItem
                                    label={useLanguage.phone}
                                    name="phone"
                                    rules={[
                                        {
                                            pattern: /^\d{7,16}$/g,
                                            message: useLanguage.format_err,
                                        },
                                    ]}
                                >
                                    <Input disabled={!isEdit} />
                                </FormItem>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={22}>
                                <FormItem label={useLanguage.address} name="address">
                                    <Input disabled={!isEdit} />
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={9}>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label={useLanguage.mail}
                                    name="email"
                                    rules={[
                                        {
                                            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
                                            message: useLanguage.format_err,
                                        },
                                    ]}
                                >
                                    <Input disabled={!isEdit} />
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem label={useLanguage.area} name="area">
                                    <Input prefix="≈" suffix="㎡" disabled={true} />
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
