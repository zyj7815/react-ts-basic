import React from 'react'
import { Form, Row, Col, Input, Radio, Button } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { formFullLayout } from '@/config'
import AwePage from '@/components/awe-page'

const FormItem = Form.Item

export const EditPastureLocation: React.FC = props => {
    const formOperation = (
        <Form {...formFullLayout}>
            <Row>
                <Col xs={24} md={24} lg={24} xl={11} xxl={11} style={{ paddingRight: 30 }}>
                    <FormItem
                        label={useLanguage.pasture_location}
                        help={useLanguage.enter_address_select_location}
                    >
                        <Input />
                    </FormItem>
                </Col>
                <Col lg={24} xl={13} xxl={12}>
                    <FormItem label={useLanguage.draw_range}>
                        <Radio.Group>
                            <Radio.Button value="1">{useLanguage.circle}</Radio.Button>
                            <Radio.Button value="2">{useLanguage.rectangle}</Radio.Button>
                            <Radio.Button value="3">{useLanguage.polygon}</Radio.Button>
                        </Radio.Group>
                        <Button type="primary" danger>
                            {useLanguage.clear}
                        </Button>
                    </FormItem>
                    <span className="edit-pasture__location--area">{useLanguage.area}: --</span>
                </Col>
            </Row>
        </Form>
    )

    return (
        <div className="edit-pasture-item edit-pasture__location beauty-shadow beauty-radius">
            <header className="edit-pasture__title">{useLanguage.edit_info}</header>
            <AwePage nav={formOperation}>
                <section className="edit-pasture__location--map">map</section>
            </AwePage>
        </div>
    )
}
