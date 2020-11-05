import React from 'react'
import { Modal, Form, Input, message } from 'antd'
import { SimpleModalProps } from '@/types'
import { useLanguage } from '@/language/useLanguage'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'

const FormItem = Form.Item

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
}

const NewGroupModal: React.FC<SimpleModalProps> = (props: SimpleModalProps) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (props.visible) {
            form.resetFields()
        }
    }, [props.visible])

    const onSubmit = async () => {
        try {
            const values = await form.validateFields()

            setLoading(true)
            try {
                const res = await axios.post(Api.group.list, values, Token.data)
                message.success(useLanguage.success_common(useLanguage.add_new))
                setLoading(false)
                props.onMainEvent(res.data)
            } catch (err) {
                setLoading(false)
                errorMessage.alert(err)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal
            visible={props.visible}
            title={useLanguage.new_group}
            okText={useLanguage.confirm}
            cancelText={useLanguage.cancel}
            onOk={onSubmit}
            okType="primary"
            onCancel={props.onClose}
            confirmLoading={loading}
        >
            <Form form={form} {...layout}>
                <FormItem
                    label={useLanguage.group_name}
                    name="room_name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </FormItem>

                <FormItem label={useLanguage.remark} name="description">
                    <Input.TextArea />
                </FormItem>
            </Form>
        </Modal>
    )
}

export default NewGroupModal
