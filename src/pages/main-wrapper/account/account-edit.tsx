import React, { useState } from 'react'
import { AweRouteProps } from '@/types/route'
import { Row, Col, Button, Form, Input, Select, Upload, message } from 'antd'
import './account-edit.less'
import { useLanguage } from '@/language/useLanguage'
import { RouteUris } from '@/router/config'
import { UserOutlined } from '@ant-design/icons'
const { TextArea } = Input
const { Option } = Select

const AccountEdit: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState([])
    const submit = (values: any) => {
        form.resetFields()
        console.log(values)
    }
    const cancel = () => {
        routeProps.history.push(RouteUris.MainAccount)
    }
    const onRequestImage = (image: any) => {
        let file = image.file
        console.log(file)
        // const isJPG = file.type === 'image/jpeg' || 'image/png'
        // if (!isJPG) {
        //     message.info(useLanguage.update_png_img)
        //     return
        // }
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //     message.info(useLanguage.picture_size_2M)
        //     return
        // }
        //
        // delete file.uid
        // const {id} = this.props

        // axios.put(Api.biological.uploadImg_v2(id, file.name), file, token).then(() => {
        //     message.success(window.language.success_common(window.language.upload_picture))
        //     this.isRefenshed = false;
        //     this.props.onUpdate();
        // }).catch(err => {
        //     message.error(window.language.failed_common(window.language.upload_picture))
        // })
    }
    return (
        <div id={'account-edit'}>
            <div className={'content'}>
                <div className={'content-box'}>
                    <div className={'title-box'}>
                        <div className={'text-box'}>
                            <div className={'icon'}></div>
                            <div className={'title'}>编辑资料</div>
                        </div>
                        <div>
                            <Button className={'cancel-btn'} onClick={cancel}>
                                {useLanguage.cancel}
                            </Button>
                            <Button
                                className={'save-btn'}
                                onClick={() => {
                                    form.validateFields()
                                        .then(values => {
                                            submit(values)
                                        })
                                        .catch(info => {
                                            console.log('Validate Failed:', info)
                                        })
                                }}
                            >
                                {useLanguage.save}
                            </Button>
                        </div>
                    </div>
                    <div className={'Bottom-box'}>
                        <div className={'left-box'}>
                            <div className={'avatar'}>
                                <UserOutlined />
                            </div>
                            <div className={'ava-btn'}>
                                <Upload
                                    customRequest={onRequestImage}
                                    fileList={fileList}
                                    accept=".jpg,.png,.jpeg,.bmp"
                                >
                                    <Button className={'up-ava'}>上传头像</Button>
                                </Upload>
                            </div>
                        </div>
                        <div className={'form-box'}>
                            <Form
                                labelCol={{ span: 5 }}
                                form={form}
                                wrapperCol={{ span: 19 }}
                                layout="horizontal"
                            >
                                <Form.Item
                                    label={useLanguage.account_name}
                                    name="account_name"
                                    rules={[{ required: true, message: '请输入公司名称' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={useLanguage.gender}
                                    name="gender"
                                    rules={[{ required: true, message: '请输入公司名称' }]}
                                >
                                    <Select defaultValue="man">
                                        <Option value="man">{useLanguage.man}</Option>
                                        <Option value="woman">{useLanguage.woman}</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={useLanguage.phone_new}
                                    name="phone"
                                    rules={[{ required: true, message: '请输入公司名称' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={useLanguage.mail}
                                    name="mail"
                                    rules={[{ required: true, message: '请输入公司名称' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={useLanguage.address}
                                    name="address"
                                    rules={[{ required: true, message: '请输入公司名称' }]}
                                >
                                    <TextArea showCount autoSize={{ minRows: 4, maxRows: 4 }} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountEdit
