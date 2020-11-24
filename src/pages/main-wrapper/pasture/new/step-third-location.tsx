import React from 'react'
import { PastureStepProps } from '@/pages/main-wrapper/pasture/new/index'
import { Button, Row, Col, Form, Input, Radio } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import AwePage from '@/components/awe-page'
import { formFullLayout } from '@/config'

const FormItem = Form.Item

export const ThirdStepLocation: React.FC<PastureStepProps> = (props: PastureStepProps) => {
    const footer = (
        <footer className="new-pasture-footer">
            <Button onClick={props.onPreStep}>{useLanguage.last_step}</Button>
            <Button type="primary" onClick={props.onNextStep}>
                {useLanguage.confirm}
            </Button>
        </footer>
    )

    return (
        <AwePage isFBorder={true} noPadding={true} footer={footer}>
            <section className="new-pasture-location">
                <Row gutter={[10, 0]} style={{ height: '100%' }}>
                    <Col xs={24} sm={24} md={24} lg={15} xl={17}>
                        <main className="new-pasture-location__map">map</main>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={9} xl={7}>
                        <Form {...formFullLayout} className="new-pasture-location__edit">
                            <FormItem
                                label={useLanguage.pasture_location}
                                help={useLanguage.enter_address_select_location}
                            >
                                <Input />
                            </FormItem>

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
                            <span className="edit-pasture__location--area">
                                {useLanguage.area}: --
                            </span>
                        </Form>
                    </Col>
                </Row>
            </section>
        </AwePage>
    )
}
