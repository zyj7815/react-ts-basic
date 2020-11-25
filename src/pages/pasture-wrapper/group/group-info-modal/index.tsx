import React from 'react'
import { Modal, Form, Input, message } from 'antd'
import { SimpleModalProps } from '@/types'
import { useLanguage } from '@/language/useLanguage'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { GroupProps } from '@/model'

const FormItem = Form.Item

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
}

const GroupInfoModal: React.FC<SimpleModalProps<any>> = (props: SimpleModalProps<any>) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(false)
    const [groupInfo, setGroupInfo] = React.useState<GroupProps | null>(null)

    React.useEffect(() => {
        // 当有分组id时，获取分组详情
        if (props.argument) {
            if (groupInfo) {
                form.setFieldsValue({
                    room_name: groupInfo.room_name,
                    description: groupInfo.description,
                })
            } else {
                fetchGroup()
            }
        } else {
            if (!props.visible) {
                form.resetFields()
            }
        }
    }, [props.visible])

    const fetchGroup = async () => {
        try {
            const res = await axios.get(Api.group.detail(props.argument), Token.data)
            setGroupInfo(res.data)
            form.setFieldsValue({
                room_name: res.data.room_name,
                description: res.data.description,
            })
        } catch (e) {
            errorMessage.alert(e)
        }
    }

    const onSubmit = async () => {
        try {
            const values = await form.validateFields()

            setLoading(true)
            try {
                if (props.argument) {
                    // 编辑
                    const res = await axios.put(
                        Api.group.detail(props.argument),
                        values,
                        Token.data
                    )
                    message.success(useLanguage.success_common(useLanguage.edit_group))
                    setGroupInfo(res.data)
                } else {
                    // 新增
                    await axios.post(Api.group.list, values, Token.data)
                    message.success(useLanguage.success_common(useLanguage.add_new))
                }
                props.onClose()
                props.onMainEvent()
                setLoading(false)
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
            bodyStyle={{ paddingBottom: 0 }}
            onOk={onSubmit}
            okType="primary"
            onCancel={props.onClose}
            confirmLoading={loading}
            width={500}
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

export default GroupInfoModal
