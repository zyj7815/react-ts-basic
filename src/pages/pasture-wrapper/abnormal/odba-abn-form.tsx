import React, { useState } from 'react'
import { Button, Modal, Form, Input, Radio, DatePicker, Select, Checkbox } from 'antd'
import { useLanguage } from '@/language/useLanguage'
const { TextArea } = Input
const { Option } = Select

interface CollectionCreateFormProps {
    visible: boolean
    radioValue: any
    checkValue: boolean
    handleOk: () => void
    handleCancel: () => void
    onChangeRadio: (e: any) => void
    onChangeCheck: (e: any) => void
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
                    {useLanguage.cancel}
                </Button>,
                <Button key="submit" type="primary" onClick={event.handleOk}>
                    {useLanguage.finish}
                </Button>,
            ]}
        >
            <div>
                <header>请根据设备实际状态进行选择：</header>
                <div style={{ marginBottom: 20, marginTop: 20 }}>
                    <Select
                        defaultValue="lucy"
                        style={{ width: 235, marginLeft: 79 }}
                        onChange={event.onChangeRadio}
                        value={event.radioValue}
                    >
                        <Option value="jack">{useLanguage.disease}</Option>
                        <Option value="lucy">{useLanguage.pregnant}</Option>
                        <Option value="Yiminghe">{useLanguage.estrus}</Option>
                        <Option value="d">{useLanguage.death}</Option>
                    </Select>
                </div>
                <Form
                    labelCol={{ span: 6 }}
                    form={form}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                >
                    {event.radioValue === 'jack' && (
                        <Form.Item
                            label={useLanguage.disease_name_new}
                            name="old_password"
                            rules={[{ required: true, message: '请输入公司名称' }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    {event.radioValue !== 'd' && (
                        <div>
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
                        </div>
                    )}
                </Form>
                {event.radioValue === 'd' && (
                    <div>
                        <header>生物死亡将进行归档操作,请勾选以下选项来继续:</header>
                        <Checkbox onChange={event.onChangeCheck} checked={event.checkValue}>
                            <span className={'confirm-delete-text'}>
                                {useLanguage.confirm_delete}
                            </span>
                        </Checkbox>
                    </div>
                )}
            </div>
        </Modal>
    )
}
