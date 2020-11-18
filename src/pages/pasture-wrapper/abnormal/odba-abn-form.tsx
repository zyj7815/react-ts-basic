import React, { useState } from 'react'
import { Button, Modal, Form, Input, Radio, DatePicker } from 'antd'
import { useLanguage } from '@/language/useLanguage'
const { TextArea } = Input

interface CollectionCreateFormProps {
    visible: boolean
    radioValue: any
    nextModal: boolean
    handleOk: () => void
    handleCancel: () => void
    onChangeRadio: (e: any) => void
}

export const OdbaAbnForm: React.FC<CollectionCreateFormProps> = (event: any) => {
    const [form] = Form.useForm()
    const header = (
        <header className={'header-box'}>
            <div className={'title-text'}>{useLanguage.activity_abnormal}</div>
            <div style={{ display: event.nextModal ? 'none' : '' }}>
                <Button className={'title-btn'} danger={true} onClick={event.handleCancel}>
                    {useLanguage.incident_false_positive}
                </Button>
            </div>
        </header>
    )

    return (
        <Modal
            visible={event.visible}
            title={header}
            bodyStyle={{ paddingBottom: event.nextModal ? 0 : 10, margin: '0 auto', width: 362 }}
            className={'OdbaAbnModal'}
            closable={false}
            width={368}
            footer={[
                <Button key="back" onClick={event.handleCancel}>
                    {event.nextModal ? useLanguage.last_step : useLanguage.cancel}
                </Button>,
                <Button key="submit" type="primary" onClick={event.handleOk}>
                    {event.nextModal ? useLanguage.finish : useLanguage.next_step}
                </Button>,
            ]}
        >
            {event.nextModal ? (
                <Form
                    labelCol={{ span: 6 }}
                    form={form}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                >
                    {event.radioValue === 'a' && (
                        <Form.Item
                            label={useLanguage.disease_name_new}
                            name="old_password"
                            rules={[{ required: true, message: '请输入公司名称' }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    <Form.Item
                        label={useLanguage.time_of_occurrence}
                        name="new_password"
                        rules={[{ required: true, message: '请输入公司名称' }]}
                    >
                        <DatePicker showTime style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label={useLanguage.enter_remarks}
                        name="confirm_new_password"
                        rules={[{ required: true, message: '请输入公司名称' }]}
                    >
                        <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
                    </Form.Item>
                </Form>
            ) : (
                <div>
                    <header>请根据设备实际状态进行选择：</header>
                    <div>
                        <Radio.Group
                            onChange={event.onChangeRadio}
                            style={{ marginTop: 16 }}
                            value={event.radioValue}
                        >
                            <Radio.Button value="a" className={'radio-button'}>
                                {useLanguage.disease}
                            </Radio.Button>
                            <Radio.Button value="b" className={'radio-button'}>
                                {useLanguage.pregnant}
                            </Radio.Button>
                            <Radio.Button value="d" className={'radio-button'}>
                                {useLanguage.estrus}
                            </Radio.Button>
                            <Radio.Button value="c" className={'radio-button-last'}>
                                {useLanguage.death}
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
            )}
        </Modal>
    )
}
