import React from 'react'
import { Form, Input } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { formFullLayout } from '@/config'

const FormItem = Form.Item

export const EditPastureInfo: React.FC = props => {
    const [form] = Form.useForm()

    return (
        <div className="edit-pasture-item edit-pasture__info beauty-shadow beauty-radius">
            <header className="edit-pasture__title">{useLanguage.edit_info}</header>
            <main>
                <Form {...formFullLayout} form={form}>
                    <FormItem label={useLanguage.pasture_name}>
                        <Input />
                    </FormItem>

                    <FormItem label={useLanguage.phone}>
                        <Input />
                    </FormItem>

                    <FormItem label={useLanguage.mail}>
                        <Input />
                    </FormItem>

                    <FormItem label={useLanguage.remark}>
                        <Input.TextArea />
                    </FormItem>
                </Form>
            </main>
        </div>
    )
}
