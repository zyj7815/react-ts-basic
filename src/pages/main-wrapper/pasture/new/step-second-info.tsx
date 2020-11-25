import React from 'react'
import { Button, Form, Input } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { PastureStepProps } from '@/pages/main-wrapper/pasture/new/index'
import { NewPastureContext, PastureInfoProps } from '@/pages/main-wrapper/pasture/new/context'
import { formFullLayout } from '@/config'
import AwePage from '@/components/awe-page'

const FormItem = Form.Item

export const SecondStepInfo: React.FC<PastureStepProps> = (props: PastureStepProps) => {
    const { information, setInformation } = React.useContext(NewPastureContext)
    const [form] = Form.useForm()

    React.useEffect(() => {
        console.log('123123')
        if (information) {
            form.setFieldsValue({ ...information })
        }
    }, [])

    const onSubmit = async () => {
        try {
            const values = await form.validateFields()

            setInformation({
                name: values.name,
                phone: values.phone,
                email: values.email,
                description: values.description,
            })

            props.onNextStep && props.onNextStep()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AwePage
            isFBorder={true}
            noPadding={true}
            footer={
                <footer className="new-pasture-footer">
                    <Button onClick={props.onPreStep}>{useLanguage.last_step}</Button>
                    <Button type="primary" onClick={onSubmit}>
                        {useLanguage.next_step}
                    </Button>
                </footer>
            }
        >
            <section className="new-pasture-info">
                <Form {...formFullLayout} form={form}>
                    <FormItem
                        label={useLanguage.pasture_name}
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder={useLanguage.enter_please} />
                    </FormItem>

                    <FormItem label={useLanguage.phone} name="phone" rules={[{ required: true }]}>
                        <Input placeholder={useLanguage.enter_please} />
                    </FormItem>

                    <FormItem label={useLanguage.mail} name="email">
                        <Input placeholder={useLanguage.enter_please} />
                    </FormItem>

                    <FormItem label={useLanguage.remark} name="description">
                        <Input.TextArea placeholder={useLanguage.enter_please} />
                    </FormItem>
                </Form>
            </section>
        </AwePage>
    )
}
