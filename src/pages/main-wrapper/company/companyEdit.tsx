import React from 'react'
import { AweRouteProps } from '@/types/route'
import { Row, Col, Button, Form, Input, Select } from 'antd'
import './companyEdit.less'
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
        <div id={'companyEdit'}>
            <div className={'content'}>
                <div className={'contentBox'}>
                    <div className={'titleBox'}>
                        <div className={'textBox'}>
                            <div className={'icon'}></div>
                            <div className={'title'}>编辑资料</div>
                        </div>
                        <div>
                            <Button className={'cancelBtn'} onClick={cancel}>
                                {useLanguage.cancel}
                            </Button>
                            <Button
                                className={'saveBtn'}
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
                    <div className={'formBox'}>
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
                                <TextArea showCount autoSize={{ minRows: 4, maxRows: 4 }} />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyEdit
