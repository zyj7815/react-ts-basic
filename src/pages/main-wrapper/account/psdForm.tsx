import React, { useState } from 'react'
import { Button, Modal, Form, Input, Radio } from 'antd'
import { useLanguage } from '@/language/useLanguage'

interface Values {
    title: string
    description: string
    modifier: string
}

interface CollectionCreateFormProps {
    visible: boolean
    handleOk: (values: Values, form: any) => void
    handleCancel: () => void
}

export const CollectionCreateForm: React.FC<CollectionCreateFormProps> = (event: any) => {
    const [form] = Form.useForm()
    return (
        <Modal
            visible={event.visible}
            title={useLanguage.update_password}
            bodyStyle={{ paddingBottom: 0 }}
            className={'editPsdModal'}
            footer={[
                <Button
                    key="back"
                    onClick={() => {
                        form.resetFields()
                        event.handleCancel()
                    }}
                >
                    {useLanguage.cancel}
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                        form.validateFields()
                            .then(values => {
                                event.handleOk(values, form)
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
            <Form labelCol={{ span: 5 }} form={form} wrapperCol={{ span: 19 }} layout="horizontal">
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
    )
}
