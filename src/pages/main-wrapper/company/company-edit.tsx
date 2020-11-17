import React from 'react'
import { AweRouteProps } from '@/types/route'
import { Row, Col, Button, Form, Input, Select } from 'antd'
import './company-edit.less'
import { useLanguage } from '@/language/useLanguage'
import { RouteUris } from '@/router/config'
const { TextArea } = Input

const CompanyEdit: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [form] = Form.useForm()
    const submit = (values: any) => {
        form.resetFields()
        console.log(values)
    }
    const cancel = () => {
        routeProps.history.push(RouteUris.MainCompany)
    }
    return (
        <div id={'company-edit'}>
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
                    <div className={'form-box'}>
                        <Form
                            labelCol={{ span: 5 }}
                            form={form}
                            wrapperCol={{ span: 19 }}
                            layout="horizontal"
                        >
                            <Form.Item
                                label={useLanguage.company_name}
                                name="company_name"
                                rules={[{ required: true, message: '请输入公司名称' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={useLanguage.work_phone}
                                name="work_phone"
                                rules={[{ required: true, message: '请输入公司名称' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={useLanguage.company_email}
                                name="company_email"
                                rules={[{ required: true, message: '请输入公司名称' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={useLanguage.company_address}
                                name="company_address"
                                rules={[{ required: true, message: '请输入公司名称' }]}
                            >
                                <TextArea autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyEdit
